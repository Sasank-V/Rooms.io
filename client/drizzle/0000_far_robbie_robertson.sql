CREATE TABLE `alerts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`message` text NOT NULL,
	`trigger_time` integer NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`resolved` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`guest_id` text,
	`booking_id` text,
	`room_id` text,
	`staff_id` text,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`action` text NOT NULL,
	`entity` text NOT NULL,
	`entity_id` text NOT NULL,
	`user_id` text,
	`timestamp` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`description` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`from_date` integer NOT NULL,
	`from_time` text(10) NOT NULL,
	`to_date` integer NOT NULL,
	`to_time` text(10) NOT NULL,
	`amount_paid` real DEFAULT 0 NOT NULL,
	`room_id` text NOT NULL,
	`guest_id` text NOT NULL,
	`staff_id` text NOT NULL,
	`hotel_id` text,
	`status` text DEFAULT 'RESERVED' NOT NULL,
	`adult_count` integer DEFAULT 1 NOT NULL,
	`child_count` integer DEFAULT 0 NOT NULL,
	`actual_check_in` integer,
	`actual_check_out` integer,
	`is_archived` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`staff_id` text NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`date` integer NOT NULL,
	`time` text(10) NOT NULL,
	`reason` text NOT NULL,
	FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guests` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50) NOT NULL,
	`phone_number` text(15) NOT NULL,
	`aadhar_number` text(12) NOT NULL,
	`email` text(100),
	`gender` text NOT NULL,
	`date_of_birth` integer NOT NULL,
	`age` integer NOT NULL,
	`address` text NOT NULL,
	`aadhar_photo_front` text NOT NULL,
	`aadhar_photo_back` text NOT NULL,
	`face_photo` text NOT NULL,
	`current_room_id` text,
	FOREIGN KEY (`current_room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guests_aadhar_number_unique` ON `guests` (`aadhar_number`);--> statement-breakpoint
CREATE TABLE `hotels` (
	`id` text PRIMARY KEY NOT NULL,
	`hotel_name` text(100) NOT NULL,
	`hotel_email` text(100) NOT NULL,
	`phone` text(15) NOT NULL,
	`address` text NOT NULL,
	`city` text(50) NOT NULL,
	`state` text(50) NOT NULL,
	`pincode` text(10) NOT NULL,
	`gstin` text(15) NOT NULL,
	`logo` text NOT NULL,
	`email_notification` integer DEFAULT true NOT NULL,
	`whatsapp_notification` integer DEFAULT true NOT NULL,
	`daily_reports` integer DEFAULT true NOT NULL,
	`amenities` text DEFAULT '[]',
	`license_key` text(100) NOT NULL,
	`upi_id` text(50) NOT NULL,
	`room_types` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`guest_id` text NOT NULL,
	`staff_id` text NOT NULL,
	`charge_type` text NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`method` text NOT NULL,
	`date` integer NOT NULL,
	`time` text(10) NOT NULL,
	`status` text NOT NULL,
	`booking_id` text,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `room_status_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`status` text NOT NULL,
	`changed_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`changed_by_id` text NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`changed_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`room_number` text(10) NOT NULL,
	`floor` text(5) NOT NULL,
	`base_price` real DEFAULT 0 NOT NULL,
	`advance_amount` real DEFAULT 0 NOT NULL,
	`tax_rate` real DEFAULT 0 NOT NULL,
	`max_adults` integer DEFAULT 2 NOT NULL,
	`max_children` integer DEFAULT 0 NOT NULL,
	`amenities` text DEFAULT '[]',
	`room_image` text,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`is_ac` integer NOT NULL,
	`room_type` text(50) NOT NULL,
	`hotel_id` text NOT NULL,
	FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_floor_room_number_unique` ON `rooms` (`floor`,`room_number`);--> statement-breakpoint
CREATE TABLE `shifts` (
	`id` text PRIMARY KEY NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`staff_id` text NOT NULL,
	FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50) NOT NULL,
	`phone` text(15) NOT NULL,
	`email` text(100) NOT NULL,
	`aadhar_number` text(12) NOT NULL,
	`working_status` text DEFAULT 'ACTIVE' NOT NULL,
	`role` text NOT NULL,
	`password` text(100) NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);