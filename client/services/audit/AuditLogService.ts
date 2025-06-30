import { db } from '~/database';
import { auditLogs } from '~/database/schema';
import { NewAuditLog } from '~/database/types';
import { sendResponse, ServiceResponse } from '~/services/response';

/**
 * AuditLogService
 *
 * Provides methods to log and retrieve audit actions performed in the system.
 *
 * Usage:
 *   // Log an action (should be called by every service before returning a response)
 *   await AuditLogService.logAction({
 *     action: 'ACTION_TYPE',
 *     entity: 'EntityName',
 *     entityId: 'entity-id',
 *     userId: 'user-id',
 *     description: 'Description of the action',
 *   });
 *
 *   // Get all audit logs
 *   await AuditLogService.getAllLogs();
 *
 * All methods return a ServiceResponse<T> object.
 */
export class AuditLogService {
  /**
   * Logs an action to the audit log.
   * @param log - Object containing action, entity, entityId, userId, description
   * @returns ServiceResponse<NewAuditLog>
   */
  static async logAction(
    log: Omit<NewAuditLog, 'id' | 'timestamp'>
  ): Promise<ServiceResponse<NewAuditLog>> {
    try {
      await db.insert(auditLogs).values({
        ...log,
        timestamp: new Date(),
      });
      return sendResponse({
        success: true,
        message: 'Audit log created',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to create audit log',
        error,
      });
    }
  }

  /**
   * Gets all audit logs.
   * @returns ServiceResponse<AuditLog[]>
   */
  static async getAllLogs(): Promise<ServiceResponse<any[]>> {
    try {
      const logs = await db.select().from(auditLogs);
      return sendResponse({
        success: true,
        message: 'Audit logs fetched',
        data: logs,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch audit logs',
        error,
      });
    }
  }
}
