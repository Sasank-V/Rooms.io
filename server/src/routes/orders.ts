import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { FoodOrderCreateInput, ApiResponse } from '../types';

const router = Router();

// Add food charge to guest ledger
router.post('/:bookingId', async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const orderData: FoodOrderCreateInput = req.body;

    // Verify booking exists and is active
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        guest: true,
        staff: true
      }
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    if (new Date(booking.toDate) < new Date()) {
      throw new AppError(400, 'Cannot add food charges to completed booking');
    }

    // Create payment record for food charge
    const payment = await prisma.payment.create({
      data: {
        guestId: booking.guestId,
        staffId: booking.staffId,
        chargeType: 'FOOD',
        amount: orderData.totalAmount,
        method: 'CASH', // Default to cash, can be updated later
        date: new Date(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        status: 'UNPAID'
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE_FOOD_ORDER',
        entity: 'Payment',
        entityId: payment.id,
        userId: booking.staffId,
        description: `Food order of ${orderData.totalAmount} added for booking ${bookingId}. Items: ${orderData.items.map(item => `${item.name}(${item.quantity})`).join(', ')}`
      }
    });

    const response: ApiResponse<typeof payment> = {
      success: true,
      data: payment,
      message: 'Food order added successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// List food orders for booking
router.get('/:bookingId', async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      throw new AppError(404, 'Booking not found');
    }

    // Get all food payments for this booking
    const foodPayments = await prisma.payment.findMany({
      where: {
        guestId: booking.guestId,
        chargeType: 'FOOD',
        date: {
          gte: new Date(booking.fromDate),
          lte: new Date(booking.toDate)
        }
      },
      include: {
        staff: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    const response: ApiResponse<typeof foodPayments> = {
      success: true,
      data: foodPayments
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 