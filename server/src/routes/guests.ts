import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { GuestCreateInput, GuestUpdateInput, ApiResponse, PaginationParams } from '../types';

const router = Router();

// List all guests with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (page - 1) * limit;

    const [guests, total] = await Promise.all([
      prisma.guest.findMany({
        skip,
        take: limit,
        include: {
          bookings: {
            where: {
              toDate: {
                gte: new Date()
              }
            }
          }
        }
      }),
      prisma.guest.count()
    ]);

    const response: ApiResponse<{
      guests: typeof guests;
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        guests,
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

// Get guest details
router.get('/:id', async (req, res, next) => {
  try {
    const guest = await prisma.guest.findUnique({
      where: { id: req.params.id },
      include: {
        bookings: {
          include: {
            room: true,
            guest: true
          }
        }
      }
    });

    if (!guest) {
      throw new AppError(404, 'Guest not found');
    }

    const response: ApiResponse<typeof guest> = {
      success: true,
      data: guest
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Register new guest
router.post('/', async (req, res, next) => {
  try {
    const guestData: GuestCreateInput = req.body;
    
    // Check if guest with same aadhar already exists
    const existingGuest = await prisma.guest.findUnique({
      where: { aadharNumber: guestData.aadharNumber }
    });

    if (existingGuest) {
      throw new AppError(400, 'Guest with this Aadhar number already exists');
    }

    const guest = await prisma.guest.create({
      data: guestData
    });

    const response: ApiResponse<typeof guest> = {
      success: true,
      data: guest,
      message: 'Guest registered successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Update guest info
router.put('/:id', async (req, res, next) => {
  try {
    const guestData: GuestUpdateInput = req.body;
    
    // If aadhar is being updated, check for duplicates
    if (guestData.aadharNumber) {
      const existingGuest = await prisma.guest.findFirst({
        where: {
          aadharNumber: guestData.aadharNumber,
          id: { not: req.params.id }
        }
      });

      if (existingGuest) {
        throw new AppError(400, 'Guest with this Aadhar number already exists');
      }
    }

    const guest = await prisma.guest.update({
      where: { id: req.params.id },
      data: guestData
    });

    const response: ApiResponse<typeof guest> = {
      success: true,
      data: guest,
      message: 'Guest information updated successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Delete guest
router.delete('/:id', async (req, res, next) => {
  try {
    // Check if guest has active bookings
    const activeBookings = await prisma.booking.findFirst({
      where: {
        guestId: req.params.id,
        toDate: {
          gte: new Date()
        }
      }
    });

    if (activeBookings) {
      throw new AppError(400, 'Cannot delete guest with active bookings');
    }

    await prisma.guest.delete({
      where: { id: req.params.id }
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'Guest deleted successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 