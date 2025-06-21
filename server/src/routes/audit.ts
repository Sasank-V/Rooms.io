import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { ApiResponse, PaginationParams } from '../types';

const router = Router();

// List all audit logs with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        include: {
          user: true
        },
        orderBy: {
          timestamp: 'desc'
        }
      }),
      prisma.auditLog.count()
    ]);

    const response: ApiResponse<{
      logs: typeof logs;
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        logs,
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

// Get logs for specific entity
router.get('/:entity/:id', async (req, res, next) => {
  try {
    const { entity, id } = req.params;
    const { page = 1, limit = 10 } = req.query as unknown as PaginationParams;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        where: {
          entity,
          entityId: id
        },
        include: {
          user: true
        },
        orderBy: {
          timestamp: 'desc'
        }
      }),
      prisma.auditLog.count({
        where: {
          entity,
          entityId: id
        }
      })
    ]);

    const response: ApiResponse<{
      logs: typeof logs;
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        logs,
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

export default router; 