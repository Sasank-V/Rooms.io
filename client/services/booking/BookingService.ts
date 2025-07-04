/**
 * BookingService
 *
 * Provides booking management operations.
 *
 * Usage:
 *   await BookingService.listBookings();
 *   await BookingService.getBookingById(id);
 *   await BookingService.createBooking(bookingData);
 *   await BookingService.checkoutBooking(id);
 *   await BookingService.cancelBooking(id);
 *
 * All methods should return a ServiceResponse<T> object.
 */
import { db } from '~/database';
import { bookings } from '~/database/schema';
import { sendResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { eq } from 'drizzle-orm';
import {
  ListBookingsResponse,
  GetBookingByIdParams,
  GetBookingByIdResponse,
  CreateBookingParams,
  CreateBookingResponse,
  CheckoutBookingParams,
  CheckoutBookingResponse,
  CancelBookingParams,
  CancelBookingResponse,
} from '~/types/booking';

export class BookingService {
  /**
   * Lists all bookings.
   * @returns ServiceResponse<Booking[]>
   */
  static async listBookings(): Promise<ListBookingsResponse> {
    try {
      const allBookings = await db.select().from(bookings);
      return sendResponse({
        success: true,
        message: 'Bookings fetched',
        data: allBookings,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch bookings',
        error,
        data: [],
      });
    }
  }

  /**
   * Gets booking details by ID.
   * @param id - Booking ID
   * @returns ServiceResponse<Booking>
   */
  static async getBookingById({ id }: GetBookingByIdParams): Promise<GetBookingByIdResponse> {
    try {
      const booking = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
      if (!booking.length) {
        return sendResponse({
          success: false,
          message: 'Booking not found',
          data: null,
        });
      }
      return sendResponse({
        success: true,
        message: 'Booking fetched',
        data: booking[0],
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch booking',
        error,
        data: null,
      });
    }
  }

  /**
   * Creates a new booking (Check-in).
   * @param bookingData - New booking data
   * @returns ServiceResponse<Booking>
   */
  static async createBooking(bookingData: CreateBookingParams): Promise<CreateBookingResponse> {
    try {
      const [created] = await db.insert(bookings).values(bookingData).returning();
      if (!created) {
        return sendResponse({
          success: false,
          message: 'Failed to create booking',
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'CREATE',
        entity: 'Booking',
        entityId: created.id,
        userId: bookingData.createdBy || bookingData.userId || null,
        description: 'Booking created',
      });
      return sendResponse({
        success: true,
        message: 'Booking created',
        data: created,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to create booking',
        error,
      });
    }
  }

  /**
   * Checks out and closes the ledger for a booking.
   * @param id - Booking ID
   * @returns ServiceResponse<Booking>
   */
  static async checkoutBooking(params: CheckoutBookingParams): Promise<CheckoutBookingResponse> {
    const { id } = params;
    try {
      // Update booking status to CHECKED_OUT and set actualCheckOut to now
      const [updated] = await db.update(bookings)
        .set({ status: 'CHECKED_OUT', actualCheckOut: new Date() })
        .where(eq(bookings.id, id)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'Booking not found or already checked out',
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'UPDATE',
        entity: 'Booking',
        entityId: id,
        userId: params.userId || null,
        description: 'Booking checked out',
      });
      return sendResponse({
        success: true,
        message: 'Booking checked out',
        data: updated,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to checkout booking',
        error,
      });
    }
  }

  /**
   * Cancels or deletes a booking.
   * @param id - Booking ID
   * @returns ServiceResponse<null>
   */
  static async cancelBooking(params: CancelBookingParams): Promise<CancelBookingResponse> {
    const { id } = params;
    try {
      // Update booking status to CANCELLED and set isArchived
      const [updated] = await db.update(bookings)
        .set({ status: 'CANCELLED', isArchived: true })
        .where(eq(bookings.id, id)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'Booking not found or already cancelled',
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'DELETE',
        entity: 'Booking',
        entityId: id,
        userId: params.userId || null,
        description: 'Booking cancelled',
      });
      return sendResponse({
        success: true,
        message: 'Booking cancelled',
        data: null,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to cancel booking',
        error,
      });
    }
  }
}
