import {
  users,
  shifts,
  hotels,
  rooms,
  roomStatusLogs,
  guests,
  bookings,
  payments,
  alerts,
  expenses,
  auditLogs,
} from '~/database/schema';

// User Types
export type NewUser = typeof users.$inferInsert;
export type User = Omit<typeof users.$inferSelect, 'password'>;

// Shift Types
export type Shift = typeof shifts.$inferSelect;
export type NewShift = typeof shifts.$inferInsert;

// Hotel Types
export type Hotel = typeof hotels.$inferSelect;
export type NewHotel = typeof hotels.$inferInsert;

// Room Types
export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;

// Room Status Log Types
export type RoomStatusLog = typeof roomStatusLogs.$inferSelect;
export type NewRoomStatusLog = typeof roomStatusLogs.$inferInsert;

// Guest Types
export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;

// Booking Types
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

// Payment Types
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

// Alert Types
export type Alert = typeof alerts.$inferSelect;
export type NewAlert = typeof alerts.$inferInsert;

// Expense Types
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

// Audit Log Types
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
