import { db } from '~/database';
import { rooms } from '~/database/schema';
import { sendResponse, ServiceResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { RoomListResponse, RoomDetailResponse, RoomCreateInput, RoomUpdateInput } from '~/types/room';
import { eq } from 'drizzle-orm';

/**
 * RoomService
 *
 * Provides room management operations.
 *
 * Usage:
 *   await RoomService.listRooms();
 *   await RoomService.getRoomById(id);
 *   await RoomService.addRoom(roomData, userId);
 *   await RoomService.updateRoom(id, roomData, userId);
 *   await RoomService.updateRoomStatus(id, status, userId);
 *   await RoomService.deleteRoom(id, userId);
 *
 * All methods return a ServiceResponse<T> object.
 */
export class RoomService {
  /**
   * Lists all rooms.
   * @returns ServiceResponse<RoomListResponse>
   */
  static async listRooms(): Promise<ServiceResponse<RoomListResponse>> {
    try {
      const roomsList = await db.select().from(rooms);
      return sendResponse({
        success: true,
        message: 'Rooms fetched',
        data: { rooms: roomsList },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch rooms',
        error,
      });
    }
  }

  /**
   * Gets room details by ID.
   * @param id - Room ID
   * @returns ServiceResponse<RoomDetailResponse>
   */
  static async getRoomById(id: string): Promise<ServiceResponse<RoomDetailResponse>> {
    try {
      const result = await db.select().from(rooms).where(eq(rooms.id, id));
      if (!result[0]) {
        return sendResponse({
          success: false,
          message: 'Room not found',
        });
      }
      return sendResponse({
        success: true,
        message: 'Room details fetched',
        data: { room: result[0] },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch room details',
        error,
      });
    }
  }

  /**
   * Adds a new room.
   * @param roomData - New room data
   * @param userId - Acting user ID
   * @returns ServiceResponse<RoomDetailResponse>
   */
  static async addRoom(roomData: RoomCreateInput, userId: string): Promise<ServiceResponse<RoomDetailResponse>> {
    try {
      const [insertedRoom] = await db.insert(rooms).values(roomData).returning();
      await AuditLogService.logAction({
        action: 'ROOM_CREATE',
        entity: 'Room',
        entityId: insertedRoom.id,
        userId,
        description: 'Room created',
      });
      return sendResponse({
        success: true,
        message: 'Room created',
        data: { room: insertedRoom },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to create room',
        error,
      });
    }
  }

  /**
   * Updates room details.
   * @param id - Room ID
   * @param roomData - Updated room data
   * @param userId - Acting user ID
   * @returns ServiceResponse<RoomDetailResponse>
   */
  static async updateRoom(id: string, roomData: RoomUpdateInput, userId: string): Promise<ServiceResponse<RoomDetailResponse>> {
    try {
      const [updatedRoom] = await db.update(rooms).set(roomData).where(eq(rooms.id, id)).returning();
      await AuditLogService.logAction({
        action: 'ROOM_UPDATE',
        entity: 'Room',
        entityId: id,
        userId,
        description: 'Room updated',
      });
      return sendResponse({
        success: true,
        message: 'Room updated',
        data: { room: updatedRoom },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update room',
        error,
      });
    }
  }

  /**
   * Updates the status of a room (e.g., AVAILABLE, OCCUPIED).
   * @param id - Room ID
   * @param status - New status
   * @param userId - Acting user ID
   * @returns ServiceResponse<RoomDetailResponse>
   */
  static async updateRoomStatus(id: string, status: 'AVAILABLE' | 'CLEANING' | 'MAINTENANCE' | 'OCCUPIED', userId: string): Promise<ServiceResponse<RoomDetailResponse>> {
    try {
      const [updatedRoom] = await db.update(rooms).set({ status }).where(eq(rooms.id, id)).returning();
      await AuditLogService.logAction({
        action: 'ROOM_STATUS_UPDATE',
        entity: 'Room',
        entityId: id,
        userId,
        description: `Room status updated to ${status}`,
      });
      return sendResponse({
        success: true,
        message: 'Room status updated',
        data: { room: updatedRoom },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update room status',
        error,
      });
    }
  }

  /**
   * Deletes a room.
   * @param id - Room ID
   * @param userId - Acting user ID
   * @returns ServiceResponse<null>
   */
  static async deleteRoom(id: string, userId: string): Promise<ServiceResponse<null>> {
    try {
      await db.delete(rooms).where(eq(rooms.id, id));
      await AuditLogService.logAction({
        action: 'ROOM_DELETE',
        entity: 'Room',
        entityId: id,
        userId,
        description: 'Room deleted',
      });
      return sendResponse({
        success: true,
        message: 'Room deleted',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to delete room',
        error,
      });
    }
  }
}
