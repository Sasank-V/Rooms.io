/**
 * HotelService
 *
 * Provides hotel setup and configuration operations.
 *
 * Usage:
 *   await HotelService.generateLicenseKey(params);
 *   await HotelService.validateLicenseKey(params); 
 *   await HotelService.getHotelConfig();
 *   await HotelService.updateHotelConfig(configData);
 *   await HotelService.activateLicense(licenseKey);
 *   await HotelService.validateLicense();
 *
 * All methods should return a ServiceResponse<T> object.
 */
import { db } from '~/database';
import { hotels } from '~/database/schema';
import { sendResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { eq } from 'drizzle-orm';
import {
  GetHotelConfigResponse,
  UpdateHotelConfigParams,
  UpdateHotelConfigResponse,
  ActivateLicenseParams,
  ActivateLicenseResponse,
  ValidateLicenseResponse,
  AdminLicensePayload,
  GenerateLicenseKeyResponse,
  GenerateLicenseKeyParams,
  ValidateLicenseKeyParams,
  ValidateLicenseKeyResponse
} from '~/types/hotel';

import crypto from 'crypto';
import Constants from 'expo-constants';

export class HotelService {
  /**
   * Generates a signed license key for an ADMIN user.
   * @param params - Admin user details and expiry
   * @returns ServiceResponse<{ licenseKey, payload }>
   */
  static async generateLicenseKey(params:GenerateLicenseKeyParams): Promise<GenerateLicenseKeyResponse> {
    try {
      const payload: AdminLicensePayload = {
        ...params,
        issuedAt: new Date().toISOString(),
        role: 'ADMIN',
      };
      const secret = Constants.expoConfig?.extra?.LICENSE_SECRET;
      if (!secret) {
        return sendResponse({
          success: false,
          message: 'LICENSE_SECRET not set in environment',
        });
      }
      const payloadStr = JSON.stringify(payload);
      const signature = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64');
      const licenseKey = Buffer.from(JSON.stringify({ payload, signature })).toString('base64');
      return sendResponse({
        success: true,
        message: 'License key generated',
        data: { licenseKey, payload },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to generate license key',
        error,
      });
    }
  }

  /**
   * Validates a signed license key for an ADMIN user.
   * @param params - { licenseKey }
   * @returns ServiceResponse<{ valid, reason?, payload? }>
   */
  static async validateLicenseKey(params: ValidateLicenseKeyParams): Promise<ValidateLicenseKeyResponse> {
    try {
      const secret = Constants.expoConfig?.extra?.LICENSE_SECRET;
      if (!secret) {
        return sendResponse({
          success: false,
          message: 'LICENSE_SECRET not set in environment',
          data: { valid: false, reason: 'LICENSE_SECRET not set' },
        });
      }
      let decoded: any;
      try {
        decoded = JSON.parse(Buffer.from(params.licenseKey, 'base64').toString('utf-8'));
      } catch (err) {
        return sendResponse({
          success: false,
          message: 'License key is not valid base64',
          data: { valid: false, reason: 'Invalid base64' },
        });
      }
      const { payload, signature } = decoded;
      if (!payload || !signature) {
        return sendResponse({
          success: false,
          message: 'License key structure invalid',
          data: { valid: false, reason: 'Invalid structure' },
        });
      }
      const payloadStr = JSON.stringify(payload);
      const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64');
      if (signature !== expectedSig) {
        return sendResponse({
          success: false,
          message: 'Signature mismatch',
          data: { valid: false, reason: 'Signature mismatch' },
        });
      }
      // Check expiry
      if (payload.expiry && new Date(payload.expiry) < new Date()) {
        return sendResponse({
          success: true,
          message: 'License expired',
          data: { valid: false, reason: 'License expired', payload },
        });
      }
      return sendResponse({
        success: true,
        message: 'License is valid',
        data: { valid: true, payload },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to validate license key',
        error,
        data: { valid: false, reason: 'Exception' },
      });
    }
  }

  /**
   * Gets the current hotel configuration.
   * @returns ServiceResponse<Hotel>
   */
  static async getHotelConfig(): Promise<GetHotelConfigResponse> {
    try {
      // Assuming only one hotel config (first row)
      const hotelRow = await db.select().from(hotels).limit(1);
      if (!hotelRow.length) {
        return sendResponse({
          success: false,
          message: 'Hotel config not found',
          data: null,
        });
      }
      return sendResponse({
        success: true,
        message: 'Hotel config fetched',
        data: hotelRow[0],
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch hotel config',
        error,
        data: null,
      });
    }
  }

  /**
   * Updates the hotel configuration.
   * @param configData - Updated hotel config data
   * @returns ServiceResponse<Hotel>
   */
  static async updateHotelConfig(configData: UpdateHotelConfigParams): Promise<UpdateHotelConfigResponse> {
    try {
      // Assuming only one hotel config (update first row)
      const hotelRow = await db.select().from(hotels).limit(1);
      if (!hotelRow.length) {
        return sendResponse({
          success: false,
          message: 'Hotel config not found',
        });
      }
      const hotelId = hotelRow[0].id;
      const [updated] = await db.update(hotels).set(configData).where(eq(hotels.id, hotelId)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'Failed to update hotel config',
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'UPDATE',
        entity: 'Hotel',
        entityId: hotelId,
        userId: configData.updatedBy || null,
        description: 'Hotel configuration updated',
      });
      return sendResponse({
        success: true,
        message: 'Hotel config updated',
        data: updated,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update hotel config',
        error,
      });
    }
  }

  /**
   * Activates the hotel license.
   * @param licenseKey - License key string
   * @returns ServiceResponse<{ activated: boolean }>
   */
  static async activateLicense({ licenseKey, userId }: ActivateLicenseParams): Promise<ActivateLicenseResponse> {
    try {
      // Assuming only one hotel config (first row)
      const hotelRow = await db.select().from(hotels).limit(1);
      if (!hotelRow.length) {
        return sendResponse({
          success: false,
          message: 'Hotel config not found',
          data: { activated: false },
        });
      }
      const hotelId = hotelRow[0].id;
      const [updated] = await db.update(hotels).set({ licenseKey }).where(eq(hotels.id, hotelId)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'Failed to activate license',
          data: { activated: false },
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'UPDATE',
        entity: 'Hotel',
        entityId: hotelId,
        userId: userId || null,
        description: 'Hotel license activated',
      });
      return sendResponse({
        success: true,
        message: 'License activated',
        data: { activated: true },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to activate license',
        error,
        data: { activated: false },
      });
    }
  }

  /**
   * Checks the hotel license status.
   * @returns ServiceResponse<{ valid: boolean }>
   */
  static async validateLicense(): Promise<ValidateLicenseResponse> {
    try {
      // Assuming only one hotel config (first row)
      const hotelRow = await db.select({ licenseKey: hotels.licenseKey }).from(hotels).limit(1);
      if (!hotelRow.length || !hotelRow[0].licenseKey) {
        return sendResponse({
          success: true,
          message: 'License is not valid',
          data: { valid: false },
        });
      }
      // You can add more logic here to validate the licenseKey format or external check
      return sendResponse({
        success: true,
        message: 'License is valid',
        data: { valid: true },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to validate license',
        error,
        data: { valid: false },
      });
    }
  }
}
