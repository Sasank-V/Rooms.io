import { Guest } from '~/database/types';

export interface GuestListResponse {
  guests: Guest[];
}

export interface GuestDetailResponse {
  guest: Guest;
}

export type GuestCreateInput = import('~/database/types').NewGuest;
export type GuestUpdateInput = Partial<import('~/database/types').NewGuest>; 