import { Room } from '~/database/types';

export interface RoomListResponse {
  rooms: Room[];
}

export interface RoomDetailResponse {
  room: Room;
}

export type RoomCreateInput = import('~/database/types').NewRoom;
export type RoomUpdateInput = Partial<import('~/database/types').NewRoom>; 