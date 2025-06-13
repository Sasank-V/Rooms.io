import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ApiResponse } from '../types';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      success: false,
      error: err.message
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Database operation failed'
    };
    res.status(400).json(response);
    return;
  }

  const response: ApiResponse<null> = {
    success: false,
    error: 'Internal server error'
  };
  res.status(500).json(response);
}; 