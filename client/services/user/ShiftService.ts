import { db } from '~/database';
import { shifts } from '~/database/schema';
import { sendResponse, ServiceResponse } from '~/services/response';
import { eq, desc } from 'drizzle-orm';
import { getRandomUUID } from '~/utils/auth';

/**
 * Staff Shift Service
 *
 * Provides functions to record staff shift entry (login) and exit (logout).
 *
 * Usage:
 *   await ShiftService.shiftEntry(staffId);
 *   await ShiftService.shiftExit(staffId);
 */

export class ShiftService {
  /**
   * Records a shift entry for a staff member (login/start of shift).
   * @param staffId - The user's id
   */
  static async shiftEntry(
    staffId: string
  ): Promise<ServiceResponse<{ shiftId: string; startTime: Date }>> {
    try {
      const id = getRandomUUID();
      const startTime = new Date();
      // Insert a new shift record
      await db.insert(shifts).values({
        id,
        startTime,
        endTime: startTime, // Temporary workaround: set endTime to startime
        staffId,
      });
      return sendResponse({
        success: true,
        message: 'Shift entry recorded',
        data: { shiftId: id, startTime },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to record shift entry',
        error,
      });
    }
  }

  /**
   * Records a shift exit for a staff member (logout/end of shift).
   * Updates the latest shift for the staff member.
   * @param staffId - The user's id
   */
  static async shiftExit(
    staffId: string
  ): Promise<ServiceResponse<{ shiftId: string; endTime: Date }>> {
    try {
      // Find the latest shift for this staff
      const [latestShift] = await db
        .select()
        .from(shifts)
        .where(eq(shifts.staffId, staffId))
        .orderBy(desc(shifts.startTime));
      if (!latestShift) {
        return sendResponse({
          success: false,
          message: 'No active shift found for staff',
        });
      }
      const endTime = new Date();
      await db.update(shifts).set({ endTime }).where(eq(shifts.id, latestShift.id));
      return sendResponse({
        success: true,
        message: 'Shift exit recorded',
        data: { shiftId: latestShift.id, endTime },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to record shift exit',
        error,
      });
    }
  }
}
