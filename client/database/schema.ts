import { sqliteTable, text, integer, real, unique } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';


// Enums - SQLite doesn't have native enums, so we use text with type constraints
export const userRoleEnum = ['ADMIN', 'FRONT_DESK', 'HOUSEKEEPING', 'MANAGER'] as const;
export const workingStatusEnum = ['ACTIVE', 'INACTIVE'] as const;
export const roomStatusEnum = ['AVAILABLE', 'CLEANING', 'MAINTENANCE', 'OCCUPIED'] as const;
export const genderEnum = ['MALE', 'FEMALE', 'OTHER'] as const;
export const bookingStatusEnum = [
  'RESERVED',
  'CHECKED_IN',
  'CHECKED_OUT',
  'CANCELLED',
  'NO_SHOW',
] as const;
export const chargeTypeEnum = ['ADVANCE', 'CHECKOUT', 'FOOD', 'EXTRA'] as const;
export const paymentMethodEnum = ['CASH', 'CARD', 'UPI'] as const;
export const paymentStatusEnum = ['PAID', 'UNPAID'] as const;
export const alertTypeEnum = [
  'WAKE_UP_CALL',
  'CLEANING_REMINDER',
  'ADVANCE_EXPIRY',
  'ROOM_CHANGE_REQUEST',
  'SPECIAL_REQUEST',
  'CHECKOUT_REMINDER',
  'SHIFT_ALERT',
] as const;

// Users table
export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text('first_name', { length: 50 }).notNull(),
  lastName: text('last_name', { length: 50 }).notNull(),
  phone: text('phone', { length: 10 }).unique().notNull(),
  email: text('email', { length: 100 }).notNull(),
  aadharNumber: text('aadhar_number', { length: 12 }).notNull(),
  workingStatus: text('working_status', { enum: workingStatusEnum }).default('ACTIVE').notNull(),
  role: text('role', { enum: userRoleEnum }).notNull(),
  password: text('password', { length: 100 }).notNull(),
});

// Shifts table
export const shifts = sqliteTable('shifts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
  endTime: integer('end_time', { mode: 'timestamp' }).notNull(),
  staffId: text('staff_id')
    .notNull()
    .references(() => users.id),
});

// Hotels table
export const hotels = sqliteTable('hotels', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  hotelName: text('hotel_name', { length: 100 }).notNull(),
  hotelEmail: text('hotel_email', { length: 100 }).notNull(),
  phone: text('phone', { length: 15 }).notNull(),
  address: text('address').notNull(),
  city: text('city', { length: 50 }).notNull(),
  state: text('state', { length: 50 }).notNull(),
  pincode: text('pincode', { length: 10 }).notNull(),
  gstin: text('gstin', { length: 15 }).notNull(),
  logo: text('logo').notNull(),
  emailNotification: integer('email_notification', { mode: 'boolean' }).default(true).notNull(),
  whatsappNotification: integer('whatsapp_notification', { mode: 'boolean' })
    .default(true)
    .notNull(),
  dailyReports: integer('daily_reports', { mode: 'boolean' }).default(true).notNull(),
  amenities: text('amenities', { mode: 'json' }).$type<string[]>().default([]),
  licenseKey: text('license_key', { length: 100 }).notNull(),
  upiId: text('upi_id', { length: 50 }).notNull(),
  roomTypes: text('room_types', { mode: 'json' }).$type<string[]>().default([]),
});

// Rooms table
export const rooms = sqliteTable(
  'rooms',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    roomNumber: text('room_number', { length: 10 }).notNull(),
    floor: text('floor', { length: 5 }).notNull(),
    basePrice: real('base_price').default(0.0).notNull(),
    advanceAmount: real('advance_amount').default(0.0).notNull(),
    taxRate: real('tax_rate').default(0.0).notNull(),
    maxAdults: integer('max_adults').default(2).notNull(),
    maxChildren: integer('max_children').default(0).notNull(),
    amenities: text('amenities', { mode: 'json' }).$type<string[]>().default([]),
    roomImage: text('room_image'),
    status: text('status', { enum: roomStatusEnum }).default('AVAILABLE').notNull(),
    isAC: integer('is_ac', { mode: 'boolean' }).notNull(),
    roomType: text('room_type', { length: 50 }).notNull(),
    hotelId: text('hotel_id')
      .notNull()
      .references(() => hotels.id),
  },
  (table) => ({
    floorRoomUnique: unique().on(table.floor, table.roomNumber),
  })
);

// Room Status Log table
export const roomStatusLogs = sqliteTable('room_status_logs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  roomId: text('room_id')
    .notNull()
    .references(() => rooms.id),
  status: text('status', { enum: roomStatusEnum }).notNull(),
  changedAt: integer('changed_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  changedById: text('changed_by_id')
    .notNull()
    .references(() => users.id),
});

// Guests table
export const guests = sqliteTable('guests', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text('first_name', { length: 50 }).notNull(),
  lastName: text('last_name', { length: 50 }).notNull(),
  phoneNumber: text('phone_number', { length: 15 }).notNull(),
  aadharNumber: text('aadhar_number', { length: 12 }).unique().notNull(),
  email: text('email', { length: 100 }),
  gender: text('gender', { enum: genderEnum }).notNull(),
  dateOfBirth: integer('date_of_birth', { mode: 'timestamp' }).notNull(),
  age: integer('age').notNull(),
  address: text('address').notNull(),
  aadharPhotoFront: text('aadhar_photo_front').notNull(),
  aadharPhotoBack: text('aadhar_photo_back').notNull(),
  facePhoto: text('face_photo').notNull(),
  currentRoomId: text('current_room_id').references(() => rooms.id),
});

// Bookings table
export const bookings = sqliteTable('bookings', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fromDate: integer('from_date', { mode: 'timestamp' }).notNull(),
  fromTime: text('from_time', { length: 10 }).notNull(),
  toDate: integer('to_date', { mode: 'timestamp' }).notNull(),
  toTime: text('to_time', { length: 10 }).notNull(),
  amountPaid: real('amount_paid').default(0.0).notNull(),
  roomId: text('room_id')
    .notNull()
    .references(() => rooms.id),
  guestId: text('guest_id')
    .notNull()
    .references(() => guests.id),
  staffId: text('staff_id')
    .notNull()
    .references(() => users.id),
  hotelId: text('hotel_id').references(() => hotels.id),
  status: text('status', { enum: bookingStatusEnum }).default('RESERVED').notNull(),
  adultCount: integer('adult_count').default(1).notNull(),
  childCount: integer('child_count').default(0).notNull(),
  actualCheckIn: integer('actual_check_in', { mode: 'timestamp' }),
  actualCheckOut: integer('actual_check_out', { mode: 'timestamp' }),
  isArchived: integer('is_archived', { mode: 'boolean' }).default(false).notNull(),
});

// Payments table
export const payments = sqliteTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  guestId: text('guest_id')
    .notNull()
    .references(() => guests.id),
  staffId: text('staff_id')
    .notNull()
    .references(() => users.id),
  chargeType: text('charge_type', { enum: chargeTypeEnum }).notNull(),
  amount: real('amount').default(0.0).notNull(),
  method: text('method', { enum: paymentMethodEnum }).notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  time: text('time', { length: 10 }).notNull(),
  status: text('status', { enum: paymentStatusEnum }).notNull(),
  bookingId: text('booking_id').references(() => bookings.id),
});

// Alerts table
export const alerts = sqliteTable('alerts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text('type', { enum: alertTypeEnum }).notNull(),
  message: text('message').notNull(),
  triggerTime: integer('trigger_time', { mode: 'timestamp' }).notNull(),
  isRead: integer('is_read', { mode: 'boolean' }).default(false).notNull(),
  resolved: integer('resolved', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  guestId: text('guest_id').references(() => guests.id),
  bookingId: text('booking_id').references(() => bookings.id),
  roomId: text('room_id').references(() => rooms.id),
  staffId: text('staff_id').references(() => users.id),
});

// Expenses table
export const expenses = sqliteTable('expenses', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  staffId: text('staff_id')
    .notNull()
    .references(() => users.id),
  amount: real('amount').default(0.0).notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  time: text('time', { length: 10 }).notNull(),
  reason: text('reason').notNull(),
});

// Audit Log table
export const auditLogs = sqliteTable('audit_logs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: text('entity_id').notNull(),
  userId: text('user_id').references(() => users.id),
  timestamp: integer('timestamp', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  description: text('description').notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  shifts: many(shifts),
  bookings: many(bookings),
  payments: many(payments),
  expenses: many(expenses),
  auditLogs: many(auditLogs),
  alerts: many(alerts),
  roomStatusLogs: many(roomStatusLogs),
}));

export const shiftsRelations = relations(shifts, ({ one }) => ({
  staff: one(users, { fields: [shifts.staffId], references: [users.id] }),
}));

export const hotelsRelations = relations(hotels, ({ many }) => ({
  rooms: many(rooms),
  bookings: many(bookings),
}));

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  hotel: one(hotels, { fields: [rooms.hotelId], references: [hotels.id] }),
  bookings: many(bookings),
  alerts: many(alerts),
  roomStatusLogs: many(roomStatusLogs),
  guests: many(guests),
}));

export const guestsRelations = relations(guests, ({ one, many }) => ({
  currentRoom: one(rooms, { fields: [guests.currentRoomId], references: [rooms.id] }),
  bookings: many(bookings),
  payments: many(payments),
  alerts: many(alerts),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  room: one(rooms, { fields: [bookings.roomId], references: [rooms.id] }),
  guest: one(guests, { fields: [bookings.guestId], references: [guests.id] }),
  staff: one(users, { fields: [bookings.staffId], references: [users.id] }),
  hotel: one(hotels, { fields: [bookings.hotelId], references: [hotels.id] }),
  alerts: many(alerts),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  guest: one(guests, { fields: [payments.guestId], references: [guests.id] }),
  staff: one(users, { fields: [payments.staffId], references: [users.id] }),
  booking: one(bookings, { fields: [payments.bookingId], references: [bookings.id] }),
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
  guest: one(guests, { fields: [alerts.guestId], references: [guests.id] }),
  booking: one(bookings, { fields: [alerts.bookingId], references: [bookings.id] }),
  room: one(rooms, { fields: [alerts.roomId], references: [rooms.id] }),
  staff: one(users, { fields: [alerts.staffId], references: [users.id] }),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  staff: one(users, { fields: [expenses.staffId], references: [users.id] }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, { fields: [auditLogs.userId], references: [users.id] }),
}));

export const roomStatusLogsRelations = relations(roomStatusLogs, ({ one }) => ({
  room: one(rooms, { fields: [roomStatusLogs.roomId], references: [rooms.id] }),
  changedBy: one(users, { fields: [roomStatusLogs.changedById], references: [users.id] }),
}));
