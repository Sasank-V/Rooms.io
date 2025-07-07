import { db } from '~/database';
import { payments } from '~/database/schema';
import { sendResponse, ServiceResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { PaymentListResponse, PaymentDetailResponse } from '~/types/payment';
import { eq } from 'drizzle-orm';

/**
 * PaymentService
 *
 * Provides payment management operations.
 *
 * Usage:
 *   await PaymentService.listPayments();
 *   await PaymentService.getPaymentById(id);
 *   await PaymentService.recordPayment(paymentData, userId);
 *   await PaymentService.updatePayment(id, paymentData, userId);
 *   await PaymentService.deletePayment(id, userId);
 *
 * All methods return a ServiceResponse<T> object.
 */
export class PaymentService {
  /**
   * Lists all payments.
   * @returns ServiceResponse<PaymentListResponse>
   */
  static async listPayments(): Promise<ServiceResponse<PaymentListResponse>> {
    try {
      const paymentsList = await db.select().from(payments);
      return sendResponse({
        success: true,
        message: 'Payments fetched',
        data: { payments: paymentsList },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch payments',
        error,
      });
    }
  }

  /**
   * Gets payment details by ID.
   * @param id - Payment ID
   * @returns ServiceResponse<PaymentDetailResponse>
   */
  static async getPaymentById(id: string): Promise<ServiceResponse<PaymentDetailResponse>> {
    try {
      const result = await db.select().from(payments).where(eq(payments.id, id));
      if (!result[0]) {
        return sendResponse({
          success: false,
          message: 'Payment not found',
        });
      }
      return sendResponse({
        success: true,
        message: 'Payment details fetched',
        data: { payment: result[0] },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch payment details',
        error,
      });
    }
  }

  /**
   * Records a new payment.
   * @param paymentData - New payment data
   * @param userId - Acting user ID
   * @returns ServiceResponse<PaymentDetailResponse>
   */
  static async recordPayment(paymentData: any, userId: string): Promise<ServiceResponse<PaymentDetailResponse>> {
    try {
      const [insertedPayment] = await db.insert(payments).values(paymentData).returning();
      await AuditLogService.logAction({
        action: 'PAYMENT_CREATE',
        entity: 'Payment',
        entityId: insertedPayment.id,
        userId,
        description: 'Payment recorded',
      });
      return sendResponse({
        success: true,
        message: 'Payment recorded',
        data: { payment: insertedPayment },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to record payment',
        error,
      });
    }
  }

  /**
   * Updates an existing payment.
   * @param id - Payment ID
   * @param paymentData - Updated payment data
   * @param userId - Acting user ID
   * @returns ServiceResponse<PaymentDetailResponse>
   */
  static async updatePayment(id: string, paymentData: any, userId: string): Promise<ServiceResponse<PaymentDetailResponse>> {
    try {
      const [updatedPayment] = await db.update(payments).set(paymentData).where(eq(payments.id, id)).returning();
      await AuditLogService.logAction({
        action: 'PAYMENT_UPDATE',
        entity: 'Payment',
        entityId: id,
        userId,
        description: 'Payment updated',
      });
      return sendResponse({
        success: true,
        message: 'Payment updated',
        data: { payment: updatedPayment },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update payment',
        error,
      });
    }
  }

  /**
   * Deletes a payment.
   * @param id - Payment ID
   * @param userId - Acting user ID
   * @returns ServiceResponse<null>
   */
  static async deletePayment(id: string, userId: string): Promise<ServiceResponse<null>> {
    try {
      await db.delete(payments).where(eq(payments.id, id));
      await AuditLogService.logAction({
        action: 'PAYMENT_DELETE',
        entity: 'Payment',
        entityId: id,
        userId,
        description: 'Payment deleted',
      });
      return sendResponse({
        success: true,
        message: 'Payment deleted',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to delete payment',
        error,
      });
    }
  }
}
