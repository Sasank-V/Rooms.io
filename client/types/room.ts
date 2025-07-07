import { Room } from '~/database/types';

export interface RoomListResponse {
  rooms: Room[];
}

export interface RoomDetailResponse {
  room: Room;
} 