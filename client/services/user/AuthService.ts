import { db } from '~/database';
import { users } from '~/database/schema';
import { User } from '~/database/types';
import { sendResponse, ServiceResponse } from '~/services/response';
import { SignUpData, LoginData } from '~/types/auth';
import { getRandomUUID, hashPassword } from '../../utils/auth';
import { eq } from 'drizzle-orm';
import { ShiftService } from '~/services/user/ShiftService';
import { AuditLogService } from '~/services/audit/AuditLogService';

//TO DO:
// Password Reset - Using Email/Whatsapp

/**
 * AuthService
 *
 * Provides user authentication and registration logic.
 *
 * Usage:
 *   await AuthService.signUp(signUpData);
 *   await AuthService.login(loginData);
 *   await AuthService.logout(userId);
 *
 * All methods return a ServiceResponse<T> object.
 */

export class AuthService {
  /**
   * Registers a new user.
   * @param data - SignUpData object
   * @returns ServiceResponse<User>
   */
  static async signUp(data: SignUpData): Promise<ServiceResponse<User>> {
    try {
      const id = getRandomUUID();
      const hashedPassword = await hashPassword(data.password);
      await db.insert(users).values({
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        aadharNumber: data.aadharNumber,
        role: data.role,
        password: hashedPassword,
        workingStatus: 'ACTIVE',
      });
      // Log the action
      await AuditLogService.logAction({
        action: 'USER_SIGNUP',
        entity: 'User',
        entityId: id,
        userId: id,
        description: `User registered: ${data.firstName} ${data.lastName}`,
      });
      return sendResponse({
        success: true,
        message: 'User registered successfully',
        data: {
          id,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          aadharNumber: data.aadharNumber,
          workingStatus: 'ACTIVE',
          role: data.role,
        },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Failed to register user',
        error,
      });
    }
  }

  /**
   * Authenticates a user and records shift entry.
   * @param data - LoginData object
   * @returns ServiceResponse<User | null>
   */
  static async login(data: LoginData): Promise<ServiceResponse<User | null>> {
    try {
      const result = await db.select().from(users).where(eq(users.phone, data.phone));
      const user = result[0];
      if (!user) {
        return sendResponse({
          success: false,
          message: 'User not found',
        });
      }
      if (user.password !== (await hashPassword(data.password))) {
        return sendResponse({
          success: false,
          message: 'Invalid credentials',
        });
      }
      // Record shift entry
      await ShiftService.shiftEntry(user.id);
      return sendResponse({
        success: true,
        message: 'Login successful',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          aadharNumber: user.aadharNumber,
          workingStatus: user.workingStatus,
          role: user.role,
        },
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Login failed',
        error,
      });
    }
  }

  /**
   * Logs out a user and records shift exit.
   * @param userId - The user's id
   * @returns ServiceResponse<null>
   */
  static async logout(userId: string): Promise<ServiceResponse<null>> {
    try {
      // Record shift exit
      await ShiftService.shiftExit(userId);
      // Remove tokens from storage (if any)
      // Clear the user context on the client side
      return sendResponse({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      return sendResponse({
        success: false,
        message: 'Logout failed',
        error,
      });
    }
  }
}
