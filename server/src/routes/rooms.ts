import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { RoomCreateInput, RoomUpdateInput, ApiResponse } from '../types';
import { RoomStatus } from '@prisma/client';

const router = Router();

// List all rooms
router.get('/', async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        hotel: true,
        bookings: {
          where: {
            toDate: {
              gte: new Date()
            }
          }
        }
      }
    });

    const response: ApiResponse<typeof rooms> = {
      success: true,
      data: rooms
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Get room details
router.get('/:id', async (req, res, next) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: req.params.id },
      include: {
        hotel: true,
        bookings: {
          where: {
            toDate: {
              gte: new Date()
            }
          }
        }
      }
    });

    if (!room) {
      throw new AppError(404, 'Room not found');
    }

    const response: ApiResponse<typeof room> = {
      success: true,
      data: room
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Add new room
router.post('/', async (req, res, next) => {
  try {
    const roomData: RoomCreateInput = req.body;
    const room = await prisma.room.create({
      data: roomData
    });

    const response: ApiResponse<typeof room> = {
      success: true,
      data: room,
      message: 'Room created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Edit room details
router.put('/:id', async (req, res, next) => {
  try {
    const roomData: RoomUpdateInput = req.body;
    const room = await prisma.room.update({
      where: { id: req.params.id },
      data: roomData
    });

    const response: ApiResponse<typeof room> = {
      success: true,
      data: room,
      message: 'Room updated successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Update room status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body as { status: RoomStatus };
    const room = await prisma.room.update({
      where: { id: req.params.id },
      data: { status }
    });

    const response: ApiResponse<typeof room> = {
      success: true,
      data: room,
      message: 'Room status updated successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Delete room
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.room.delete({
      where: { id: req.params.id }
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'Room deleted successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Get room dashboard
router.get('/dashboard', async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        roomNumber: true,
        status: true,
        floor: true,
        roomType: true,
        bookings: {
          where: {
            toDate: {
              gte: new Date()
            }
          },
          select: {
            guest: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    const dashboard = rooms.map(room => ({
      ...room,
      currentGuest: room.bookings[0]?.guest || null
    }));

    const response: ApiResponse<typeof dashboard> = {
      success: true,
      data: dashboard
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router; 