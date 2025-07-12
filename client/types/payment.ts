import { Payment } from '~/database/types';

export interface PaymentListResponse {
  payments: Payment[];
}

export interface PaymentDetailResponse {
  payment: Payment;
}

export type PaymentCreateInput = import('~/database/types').NewPayment;
export type PaymentUpdateInput = Partial<import('~/database/types').NewPayment>; 