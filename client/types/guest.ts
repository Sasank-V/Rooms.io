import { Guest } from '~/database/types';

export interface GuestListResponse {
  guests: Guest[];
}

export interface GuestDetailResponse {
  guest: Guest;
} 