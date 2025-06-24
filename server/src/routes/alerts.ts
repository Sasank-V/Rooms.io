import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { AlertCreateInput, ApiResponse, PaginationParams } from '../types';

const router = Router();

// List active alerts
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (page - 1) * limit;

    const [alerts, total] = await Promise.all([
      prisma.alert.findMany({
        skip,
        take: limit,
        where: {
          resolved: false,
          triggerTime: {
            gte: new Date()
          }
        },
        include: {
          guest: true,
          booking: true,
          room: true,
          staff: true
        },
          orderBy: {
            triggerTime: 'asc'
        
        }
      }),
      prisma.alert.count({
        where: {
          resolved: false,
          triggerTime: {
            gte: new Date()
          }
        }
      })
    ]);

    const response: ApiResponse<{
      alerts: typeof alerts;
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        alerts,
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

// Create alert
router.post('/', async (req, res, next) => {
  try {
    const alertData: AlertCreateInput = req.body;

    // Validate related entities if provided
    if (alertData.guestId) {
      const guest = await prisma.guest.findUnique({
        where: { id: alertData.guestId }
      });
      if (!guest) throw new AppError(404, 'Guest not found');
    }

    if (alertData.bookingId) {
      const booking = await prisma.booking.findUnique({
        where: { id: alertData.bookingId }
      });
      if (!booking) throw new AppError(404, 'Booking not found');
    }

    if (alertData.roomId) {
      const room = await prisma.room.findUnique({
        where: { id: alertData.roomId }
      });
      if (!room) throw new AppError(404, 'Room not found');
    }

    if (alertData.staffId) {
      const staff = await prisma.user.findUnique({
        where: { id: alertData.staffId }
      });
      if (!staff) throw new AppError(404, 'Staff member not found');
    }

    const alert = await prisma.alert.create({
      data: alertData,
      include: {
        guest: true,
        booking: true,
        room: true,
        staff: true
      }
    });

    const response: ApiResponse<typeof alert> = {
      success: true,
      data: alert,
      message: 'Alert created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Dismiss alert
router.delete('/:id', async (req, res, next) => {
  try {
    const alert = await prisma.alert.findUnique({
      where: { id: req.params.id },
      include: {
        staff: true
      }
    });

    if (!alert) {
      throw new AppError(404, 'Alert not found');
    }

    if (alert.resolved) {
      throw new AppError(400, 'Alert is already resolved');
    }

    const updatedAlert = await prisma.alert.update({
      where: { id: req.params.id },
      data: {
        resolved: true,
        isRead: true
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'RESOLVE_ALERT',
        entity: 'Alert',
        entityId: alert.id,
        userId: alert.staff?.id,
        description: `Alert ${alert.id} of type ${alert.type} resolved`
      }
    });

    const response: ApiResponse<typeof updatedAlert> = {
      success: true,
      data: updatedAlert,
      message: 'Alert resolved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 