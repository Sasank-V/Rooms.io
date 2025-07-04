import { User, NewUser } from '~/database/types';
import { ServiceResponse } from '~/services/response';

// Request/response types for UserService

export interface ListUsersResponse extends ServiceResponse<User[]> {}

export interface GetUserByIdParams {
  id: string;
}
export interface GetUserByIdResponse extends ServiceResponse<User> {}

export interface AddUserParams extends Omit<NewUser, 'id'> {
  createdBy?: string | null;
}
export interface AddUserResponse extends ServiceResponse<User> {}

export interface UpdateUserParams {
  id: string;
  userData: Partial<Omit<NewUser, 'id'>> & { updatedBy?: string | null };
}
export interface UpdateUserResponse extends ServiceResponse<User> {}

export interface RemoveUserParams {
  id: string;
}
export interface RemoveUserResponse extends ServiceResponse<null> {}

export interface ChangeUserStatusParams {
  id: string;
  status: 'ACTIVE' | 'INACTIVE';
}
export interface ChangeUserStatusResponse extends ServiceResponse<User> {}

// CheckIsAdmin types
export interface CheckIsAdminParams {
  id: string;
}
export interface CheckIsAdminResponse extends ServiceResponse<{ isAdmin: boolean }> {}
