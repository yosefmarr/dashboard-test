
CREATE DATABASE dashboard_db;

CREATE USER 'dashboard'@'%' IDENTIFIED BY 'Qyr$RDz#!3Y3RL4X';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON dashboard_db.* TO 'dashboard'@'%';

FLUSH privileges;

USE dashboard_db;

-- dashboard_db.config definition

CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` enum('es','en') NOT NULL DEFAULT 'es',
  `sessionTimeOut` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.dashboard definition

CREATE TABLE `dashboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `startingCount` int(11) DEFAULT NULL,
  `minCount` int(11) DEFAULT NULL,
  `maxCount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.device definition

CREATE TABLE `device` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Device_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.devicetype definition

CREATE TABLE `devicetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DeviceType_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.permission definition

CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Permission_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.`role` definition

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.rolepermissions definition

CREATE TABLE `rolepermissions` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PermissionId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  PRIMARY KEY (`PermissionId`,`RoleId`),
  KEY `RoleId` (`RoleId`),
  CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.`user` definition

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','suspended','deleted') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RoleId` int(11) NOT NULL,
  `ConfigId` int(11) NOT NULL,
  `DashboardId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_unique` (`email`),
  KEY `RoleId` (`RoleId`),
  KEY `ConfigId` (`ConfigId`),
  KEY `DashboardId` (`DashboardId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`ConfigId`) REFERENCES `config` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`DashboardId`) REFERENCES `dashboard` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db.userdevices definition

CREATE TABLE `userdevices` (
  `UserId` int(11) NOT NULL,
  `DeviceId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DeviceTypeId` int(11) NOT NULL,
  PRIMARY KEY (`UserId`,`DeviceId`),
  UNIQUE KEY `UserDevices_DeviceId_UserId_unique` (`UserId`,`DeviceId`),
  KEY `DeviceId` (`DeviceId`),
  KEY `DeviceTypeId` (`DeviceTypeId`),
  CONSTRAINT `userdevices_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userdevices_ibfk_2` FOREIGN KEY (`DeviceId`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userdevices_ibfk_3` FOREIGN KEY (`DeviceTypeId`) REFERENCES `devicetype` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- dashboard_db init data

INSERT INTO `devicetype` (`name`, `description`, `createdAt`, `updatedAt`)
VALUES 
('In', 'Inward processing device type', NOW(), NOW()),
('Out', 'Outward processing device type', NOW(), NOW());

INSERT INTO `role` (`name`, `description`, `createdAt`, `updatedAt`)
VALUES ('Admin', 'Administrator role with full privileges', NOW(), NOW());

INSERT INTO `role` (`name`, `description`, `createdAt`, `updatedAt`)
VALUES ('User', 'Standard user with limited privileges', NOW(), NOW());

INSERT INTO `config` (`language`, `createdAt`, `updatedAt`)
VALUES ('en', NOW(), NOW());

INSERT INTO `dashboard` (`name`, `description`, `count`, `createdAt`, `updatedAt`)
VALUES ('Main Dashboard', 'This is the main dashboard for monitoring system metrics.', 0, NOW(), NOW());

INSERT INTO `user` (`firstName`, `lastName`, `email`, `password`, `createdAt`, `updatedAt`, `RoleId`, `ConfigId`, `DashboardId`)
VALUES ('Yosef', 'Maldonado', 'yosefmarr@gmail.com', '$2b$10$59ZXMCNv10DX8fEcNFLVd.VqqHuu0Chf3VVeYCOvzd3P.WH3BD7cm', NOW(), NOW(), 1, 1, 1);
