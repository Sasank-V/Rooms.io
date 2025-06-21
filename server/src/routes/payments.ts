import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { PaymentCreateInput, PaymentUpdateInput, ApiResponse, PaginationParams } from '../types';

const router = Router();

// List all payments with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        skip,
        take: limit,
        include: {
          guest: true,
          staff: true
        },
        orderBy: {
          date: 'desc'
        }
      }),
      prisma.payment.count()
    ]);

    const response: ApiResponse<{
      payments: typeof payments;
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        payments,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Get payment details
router.get('/:id', async (req, res, next) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: {
        guest: true,
        staff: true
      }
    });

    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }

    const response: ApiResponse<typeof payment> = {
      success: true,
      data: payment
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Record a payment
router.post('/', async (req, res, next) => {
  try {
    const paymentData: PaymentCreateInput = req.body;

    // Verify guest exists
    const guest = await prisma.guest.findUnique({
      where: { id: paymentData.guestId }
    });

    if (!guest) {
      throw new AppError(404, 'Guest not found');
    }

    // Verify staff exists
    const staff = await prisma.user.findUnique({
      where: { id: paymentData.staffId }
    });

    if (!staff) {
      throw new AppError(404, 'Staff member not found');
    }

    const payment = await prisma.payment.create({
      data: paymentData,
      include: {
        guest: true,
        staff: true
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE_PAYMENT',
        entity: 'Payment',
        entityId: payment.id,
        userId: staff.id,
        description: `Payment of ${payment.amount} recorded for guest ${guest.firstName} ${guest.lastName}`
      }
    });

    const response: ApiResponse<typeof payment> = {
      success: true,
      data: payment,
      message: 'Payment recorded successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Edit payment
router.put('/:id', async (req, res, next) => {
  try {
    const paymentData: PaymentUpdateInput = req.body;
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: paymentData,
      include: {
        guest: true,
        staff: true
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_PAYMENT',
        entity: 'Payment',
        entityId: payment.id,
        userId: payment.staffId,
        description: `Payment ${payment.id} updated`
      }
    });

    const response: ApiResponse<typeof payment> = {
      success: true,
      data: payment,
      message: 'Payment updated successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Delete payment
router.delete('/:id', async (req, res, next) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: {
        staff: true
      }
    });

    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }

    await prisma.payment.delete({
      where: { id: req.params.id }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'DELETE_PAYMENT',
        entity: 'Payment',
        entityId: payment.id,
        userId: payment.staff.id,
        description: `Payment ${payment.id} deleted`
      }
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'Payment deleted successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 