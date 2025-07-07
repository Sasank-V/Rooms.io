import { db } from '~/database';
import { alerts } from '~/database/schema';
import { sendResponse, ServiceResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { AlertListResponse, AlertDetailResponse } from '~/types/alert';
import { eq } from 'drizzle-orm';

/**
 * AlertService
 *
 * Provides alert and reminder management.
 *
 * Usage:
 *   await AlertService.listAlerts();
 *   await AlertService.createAlert(alertData, userId);
 *   await AlertService.dismissAlert(id, userId);
 *
 * All methods return a ServiceResponse<T> object.
 */
export class AlertService {
  /**
   * Lists all active alerts.
   * @returns ServiceResponse<AlertListResponse>
   */
  static async listAlerts(): Promise<ServiceResponse<AlertListResponse>> {
    try {
      const alertsList = await db.select().from(alerts);
      return sendResponse({
        success: true,
        message: 'Alerts fetched',
        data: { alerts: alertsList },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch alerts',
        error,
      });
    }
  }

  /**
   * Creates a new alert (e.g., wake-up call).
   * @param alertData - Alert details
   * @param userId - Acting user ID
   * @returns ServiceResponse<AlertDetailResponse>
   */
  static async createAlert(alertData: any, userId: string): Promise<ServiceResponse<AlertDetailResponse>> {
    try {
      const [insertedAlert] = await db.insert(alerts).values(alertData).returning();
      await AuditLogService.logAction({
        action: 'ALERT_CREATE',
        entity: 'Alert',
        entityId: insertedAlert.id,
        userId,
        description: 'Alert created',
      });
      return sendResponse({
        success: true,
        message: 'Alert created',
        data: { alert: insertedAlert },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to create alert',
        error,
      });
    }
  }

  /**
   * Dismisses an alert by ID.
   * @param id - Alert ID
   * @param userId - Acting user ID
   * @returns ServiceResponse<null>
   */
  static async dismissAlert(id: string, userId: string): Promise<ServiceResponse<null>> {
    try {
      await db.delete(alerts).where(eq(alerts.id, id));
      await AuditLogService.logAction({
        action: 'ALERT_DELETE',
        entity: 'Alert',
        entityId: id,
        userId,
        description: 'Alert dismissed',
      });
      return sendResponse({
        success: true,
        message: 'Alert dismissed',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to dismiss alert',
        error,
      });
    }
  }
}
