import { Hotel, NewHotel } from '~/database/types';
import { ServiceResponse } from '~/services/response';

export interface GetHotelConfigResponse extends ServiceResponse<Hotel | null> {}

export interface UpdateHotelConfigParams extends Partial<Omit<NewHotel, 'id'>> {
  updatedBy?: string | null;
}
export interface UpdateHotelConfigResponse extends ServiceResponse<Hotel> {}

export interface ActivateLicenseParams {
  licenseKey: string;
  userId?: string | null;
}
export interface ActivateLicenseResponse extends ServiceResponse<{ activated: boolean }> {}

export interface ValidateLicenseResponse extends ServiceResponse<{ valid: boolean }> {}

// --- License Key Types ---
export interface AdminLicensePayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  aadharNumber: string;
  expiry: string; // ISO date string
  issuedAt: string; // ISO date string
  role: 'ADMIN';
}

export interface GenerateLicenseKeyParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  aadharNumber: string;
  expiry: string; // ISO date string
}

export interface GenerateLicenseKeyResponse extends ServiceResponse<{ licenseKey: string, payload: AdminLicensePayload }> {}

export interface ValidateLicenseKeyParams {
  licenseKey: string;
}

export interface ValidateLicenseKeyResponse extends ServiceResponse<{ valid: boolean, reason?: string, payload?: AdminLicensePayload }> {}
