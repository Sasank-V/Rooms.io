import { db } from '~/database';
import { guests } from '~/database/schema';
import { sendResponse, ServiceResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { GuestListResponse, GuestDetailResponse, GuestCreateInput, GuestUpdateInput } from '~/types/guest';
import { eq } from 'drizzle-orm';

/**
 * GuestService
 *
 * Provides guest management operations.
 *
 * Usage:
 *   await GuestService.listGuests();
 *   await GuestService.getGuestById(id);
 *   await GuestService.registerGuest(guestData, userId);
 *   await GuestService.updateGuest(id, guestData, userId);
 *   await GuestService.deleteGuest(id, userId);
 *
 * All methods return a ServiceResponse<T> object.
 */
export class GuestService {
  /**
   * Lists all guests.
   * @returns ServiceResponse<GuestListResponse>
   */
  static async listGuests(): Promise<ServiceResponse<GuestListResponse>> {
    try {
      const guestsList = await db.select().from(guests);
      return sendResponse({
        success: true,
        message: 'Guests fetched',
        data: { guests: guestsList },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch guests',
        error,
      });
    }
  }

  /**
   * Gets guest details by ID.
   * @param id - Guest ID
   * @returns ServiceResponse<GuestDetailResponse>
   */
  static async getGuestById(id: string): Promise<ServiceResponse<GuestDetailResponse>> {
    try {
      const result = await db.select().from(guests).where(eq(guests.id, id));
      if (!result[0]) {
        return sendResponse({
          success: false,
          message: 'Guest not found',
        });
      }
      return sendResponse({
        success: true,
        message: 'Guest details fetched',
        data: { guest: result[0] },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch guest details',
        error,
      });
    }
  }

  /**
   * Registers a new guest.
   * @param guestData - New guest data
   * @param userId - Acting user ID
   * @returns ServiceResponse<GuestDetailResponse>
   */
  static async registerGuest(guestData: GuestCreateInput, userId: string): Promise<ServiceResponse<GuestDetailResponse>> {
    try {
      const [insertedGuest] = await db.insert(guests).values(guestData).returning();
      await AuditLogService.logAction({
        action: 'GUEST_CREATE',
        entity: 'Guest',
        entityId: insertedGuest.id,
        userId,
        description: 'Guest registered',
      });
      return sendResponse({
        success: true,
        message: 'Guest registered',
        data: { guest: insertedGuest },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to register guest',
        error,
      });
    }
  }

  /**
   * Updates guest info.
   * @param id - Guest ID
   * @param guestData - Updated guest data
   * @param userId - Acting user ID
   * @returns ServiceResponse<GuestDetailResponse>
   */
  static async updateGuest(id: string, guestData: GuestUpdateInput, userId: string): Promise<ServiceResponse<GuestDetailResponse>> {
    try {
      const [updatedGuest] = await db.update(guests).set(guestData).where(eq(guests.id, id)).returning();
      await AuditLogService.logAction({
        action: 'GUEST_UPDATE',
        entity: 'Guest',
        entityId: id,
        userId,
        description: 'Guest updated',
      });
      return sendResponse({
        success: true,
        message: 'Guest updated',
        data: { guest: updatedGuest },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update guest',
        error,
      });
    }
  }

  /**
   * Deletes a guest.
   * @param id - Guest ID
   * @param userId - Acting user ID
   * @returns ServiceResponse<null>
   */
  static async deleteGuest(id: string, userId: string): Promise<ServiceResponse<null>> {
    try {
      await db.delete(guests).where(eq(guests.id, id));
      await AuditLogService.logAction({
        action: 'GUEST_DELETE',
        entity: 'Guest',
        entityId: id,
        userId,
        description: 'Guest deleted',
      });
      return sendResponse({
        success: true,
        message: 'Guest deleted',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to delete guest',
        error,
      });
    }
  }
}
