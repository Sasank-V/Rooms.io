import { RoomStatus, Gender, WorkingStatus, Role, ChargeType, PaymentMethod, PaymentStatus, AlertType } from '@prisma/client';

// Room Types
export interface RoomCreateInput {
  roomNumber: string;
  floor: string;
  basePrice: number;
  advanceAmount: number;
  taxRate: number;
  maxAdults: number;
  maxChildren: number;
  amenities: string[];
  roomImage?: string;
  isAC: boolean;
  roomType: string;
  hotelId: string;
}

export interface RoomUpdateInput extends Partial<RoomCreateInput> {
  status?: RoomStatus;
}

// Guest Types
export interface GuestCreateInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  aadharNumber: string;
  email?: string;
  gender: Gender;
  dateOfBirth: Date;
  age: number;
  address: string;
  aadharPhotoFront: string;
  aadharPhotoBack: string;
  facePhoto: string;
}

export interface GuestUpdateInput extends Partial<GuestCreateInput> {}

// Payment Types
export interface PaymentCreateInput {
  guestId: string;
  staffId: string;
  chargeType: ChargeType;
  amount: number;
  method: PaymentMethod;
  date: Date;
  time: string;
  status: PaymentStatus;
}

export interface PaymentUpdateInput extends Partial<PaymentCreateInput> {}

// Food Order Types
export interface FoodOrderCreateInput {
  bookingId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  notes?: string;
}

// Alert Types
export interface AlertCreateInput {
  type: AlertType;
  message: string;
  triggerTime: Date;
  guestId?: string;
  bookingId?: string;
  roomId?: string;
  staffId?: string;
}

// Common Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 