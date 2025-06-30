PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50) NOT NULL,
	`phone` text(10) NOT NULL,
	`email` text(100) NOT NULL,
	`aadhar_number` text(12) NOT NULL,
	`working_status` text DEFAULT 'ACTIVE' NOT NULL,
	`role` text NOT NULL,
	`password` text(100) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "first_name", "last_name", "phone", "email", "aadhar_number", "working_status", "role", "password") SELECT "id", "first_name", "last_name", "phone", "email", "aadhar_number", "working_status", "role", "password" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);