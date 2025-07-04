import { Booking, NewBooking } from '~/database/types';
import { ServiceResponse } from '~/services/response';

export interface ListBookingsResponse extends ServiceResponse<Booking[]> {}
export interface GetBookingByIdParams { id: string; }
export interface GetBookingByIdResponse extends ServiceResponse<Booking | null> {}
export interface CreateBookingParams extends NewBooking {
  createdBy?: string | null;
  userId?: string;
}
export interface CreateBookingResponse extends ServiceResponse<Booking> {}
export interface CheckoutBookingParams { id: string; userId?: string | null; }
export interface CheckoutBookingResponse extends ServiceResponse<Booking> {}
export interface CancelBookingParams { id: string; userId?: string | null; }
export interface CancelBookingResponse extends ServiceResponse<null> {}
