import { db } from '~/database';
import { users } from '~/database/schema';
import { sendResponse } from '~/services/response';
import { AuditLogService } from '~/services/audit/AuditLogService';
import { eq } from 'drizzle-orm';
import {
  ListUsersResponse,
  GetUserByIdParams,
  GetUserByIdResponse,
  AddUserParams,
  AddUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
  RemoveUserParams,
  RemoveUserResponse,
  ChangeUserStatusParams,
  ChangeUserStatusResponse,
  CheckIsAdminResponse,
  CheckIsAdminParams
} from '~/types/user';

/**
 * UserService
 *
 * Provides user management operations for admin/staff.
 *
 * Usage:
 *   await UserService.checkIsAdmin();
 *   await UserService.listUsers();
 *   await UserService.getUserById(id);
 *   await UserService.addUser(userData);
 *   await UserService.updateUser(id, userData);
 *   await UserService.removeUser(id);
 *   await UserService.changeUserStatus(id, status);
 *
 * All methods should return a ServiceResponse<T> object.
 */
export class UserService {
  /**
   * Checks if a user is an admin.
   * @param id - User ID
   * @returns ServiceResponse<{ isAdmin: boolean }>
   */
  static async checkIsAdmin({ id }: CheckIsAdminParams): Promise<CheckIsAdminResponse> {
    try {
      const userRow = await db.select({ role: users.role }).from(users).where(eq(users.id, id)).limit(1);
      if (!userRow.length) {
        return sendResponse({
          success: false,
          message: 'User not found',
          data: { isAdmin: false },
        });
      }
      const isAdmin = userRow[0].role === 'ADMIN';
      return sendResponse({
        success: true,
        message: isAdmin ? 'User is admin' : 'User is not admin',
        data: { isAdmin },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to check admin status',
        error,
        data: { isAdmin: false },
      });
    }
  }

  /**
   * Lists all users.
   * @returns ServiceResponse<User[]>
   */
  static async listUsers(): Promise<ListUsersResponse> {
    try {
      const userRows = await db.select().from(users);
      // Omit password from each user
      const usersWithoutPassword = userRows.map(({ password, ...rest }) => rest);
      return sendResponse({
        success: true,
        message: 'Users fetched successfully',
        data: usersWithoutPassword,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch users',
        error,
      });
    }
  }

  /**
   * Gets user details by ID.
   * @param id - User ID
   * @returns ServiceResponse<User>
   */
  static async getUserById({ id }: GetUserByIdParams): Promise<GetUserByIdResponse> {
    try {
      const userRow = await db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!userRow.length) {
        return sendResponse({
          success: false,
          message: 'User not found',
        });
      }
      const { password, ...userWithoutPassword } = userRow[0];
      return sendResponse({
        success: true,
        message: 'User fetched successfully',
        data: userWithoutPassword,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to fetch user',
        error,
      });
    }
  }

  /**
   * Adds a new user.
   * @param userData - New user data
   * @returns ServiceResponse<User>
   */
  static async addUser(userData: AddUserParams): Promise<AddUserResponse> {
    try {
      // Insert user
      const [inserted] = await db.insert(users).values(userData).returning();
      if (!inserted) {
        return sendResponse({
          success: false,
          message: 'Failed to add user',
        });
      }
      const { password, ...userWithoutPassword } = inserted;
      // Audit log
      await AuditLogService.logAction({
        action: 'CREATE',
        entity: 'User',
        entityId: userWithoutPassword.id,
        userId: userData.createdBy || null, // expects createdBy in userData or null
        description: `User created: ${userWithoutPassword.firstName} ${userWithoutPassword.lastName}`,
      });
      return sendResponse({
        success: true,
        message: 'User added successfully',
        data: userWithoutPassword,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to add user',
        error,
      });
    }
  }

  /**
   * Updates an existing user.
   * @param id - User ID
   * @param userData - Updated user data
   * @returns ServiceResponse<User>
   */
  static async updateUser({ id, userData }: UpdateUserParams): Promise<UpdateUserResponse> {
    try {
      const [updated] = await db.update(users).set(userData).where(eq(users.id, id)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'User not found or update failed',
        });
      }
      const { password, ...userWithoutPassword } = updated;
      // Audit log
      await AuditLogService.logAction({
        action: 'UPDATE',
        entity: 'User',
        entityId: id,
        userId: userData.updatedBy || null, // expects updatedBy in userData or null
        description: `User updated: ${userWithoutPassword.firstName} ${userWithoutPassword.lastName}`,
      });
      return sendResponse({
        success: true,
        message: 'User updated successfully',
        data: userWithoutPassword,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to update user',
        error,
      });
    }
  }

  /**
   * Removes a user.
   * @param id - User ID
   * @returns ServiceResponse<null>
   */
  static async removeUser({ id }: RemoveUserParams): Promise<RemoveUserResponse> {
    try {
      const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
      if (!deleted) {
        return sendResponse({
          success: false,
          message: 'User not found or delete failed',
        });
      }
      // Audit log
      await AuditLogService.logAction({
        action: 'DELETE',
        entity: 'User',
        entityId: id,
        userId: null, // Acting userId should be passed explicitly if available
        description: `User deleted: ${deleted.firstName} ${deleted.lastName}`,
      });
      return sendResponse({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to delete user',
        error,
      });
    }
  }

  /**
   * Changes working status (ACTIVE/INACTIVE) of a user.
   * @param id - User ID
   * @param status - New status ('ACTIVE' | 'INACTIVE')
   * @returns ServiceResponse<User>
   */
  static async changeUserStatus({ id, status }: ChangeUserStatusParams): Promise<ChangeUserStatusResponse> {
    try {
      const [updated] = await db.update(users).set({ workingStatus: status }).where(eq(users.id, id)).returning();
      if (!updated) {
        return sendResponse({
          success: false,
          message: 'User not found or status update failed',
        });
      }
      const { password, ...userWithoutPassword } = updated;
      // Audit log
      await AuditLogService.logAction({
        action: 'UPDATE',
        entity: 'User',
        entityId: id,
        userId: null, // Acting userId should be passed explicitly if available
        description: `User status changed to ${status}: ${userWithoutPassword.firstName} ${userWithoutPassword.lastName}`,
      });
      return sendResponse({
        success: true,
        message: `User status changed to ${status}`,
        data: userWithoutPassword,
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to change user status',
        error,
      });
    }
  }
}
