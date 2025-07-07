import { Payment } from '~/database/types';

export interface PaymentListResponse {
  payments: Payment[];
}

export interface PaymentDetailResponse {
  payment: Payment;
} 