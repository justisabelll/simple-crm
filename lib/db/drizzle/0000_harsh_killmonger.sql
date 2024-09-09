CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `authenticator` (
	`credentialID` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`credentialPublicKey` varchar(255) NOT NULL,
	`counter` int NOT NULL,
	`credentialDeviceType` varchar(255) NOT NULL,
	`credentialBackedUp` boolean NOT NULL,
	`transports` varchar(255),
	CONSTRAINT `authenticator_userId_credentialID_pk` PRIMARY KEY(`userId`,`credentialID`),
	CONSTRAINT `authenticator_credentialID_unique` UNIQUE(`credentialID`)
);
--> statement-breakpoint
CREATE TABLE `calls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contact_id` int,
	`date` date NOT NULL,
	`time` time NOT NULL,
	`duration` int,
	`outcome` enum('Successful','No Answer','Left Voicemail'),
	`notes` text,
	CONSTRAINT `calls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company` varchar(255),
	`email` varchar(255),
	`phone` varchar(20) NOT NULL,
	`status` enum('New','In Progress','Closed') DEFAULT 'New',
	`notes` text,
	`next_follow_up` date,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follow_ups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contact_id` int,
	`date` date NOT NULL,
	`status` enum('Pending','Completed','Rescheduled') DEFAULT 'Pending',
	`notes` text,
	CONSTRAINT `follow_ups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailVerified` timestamp(3),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;