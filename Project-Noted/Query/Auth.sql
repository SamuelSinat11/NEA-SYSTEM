
-- Role 
CREATE TABLE `Role` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(120) NOT NULL,
    `Code` VARCHAR(120) NOT NULL
); 

-- Migration INTO `Role`
INSERT INTO `Role`(`Name`, `Code`) VALUES 
('Super Admin', 'superadmin'),
('Admin', 'admin'), 
('User', 'user');

-- Set Unique Index
ALTER TABLE users
ADD UNIQUE (Username) NOT NULL;

-- Join 
SELECT * FROM users INNER JOIN role ON (users.RoleId = role.Id);


-- User 
CREATE TABLE `Users` (
    `Id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `RoleId` INT(11),
    `Username` VARCHAR(120),
    `Password` VARCHAR(120),
    `IsActive` TINYINT(1), 
    `CreateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
    FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) 
); 

-- Migration INTO `User`
INSERT INTO `Users`(`RoleId`, `Username`, `Password`, `IsActive`) VALUES 
(1, 'superadmin01', 'superadmin12345', 1),
(2, 'admin01', 'admin12345', 1),
(3, 'user01', 'user12345', 1);


-- JOBSEEKER 
CREATE TABLE `JobSeeker` (
    `Roll Number` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `FullName` VARCHAR(120) NOT NULL,
    `Gender` VARCHAR(120) NOT NULL,
    `Date of Birth` DATE NOT NULL,
    `Place of Birth` VARCHAR(120) NOT NULL,
    `PhoneNumber` VARCHAR(120) NOT NULL,
    `AppliedFor` VARCHAR(120) NOT NULL,
    `Skill` VARCHAR(120) NOT NULL,
    `Education` VARCHAR(120) NOT NULL,
    `Company` VARCHAR(120) NOT NULL,
    `Postion` VARCHAR(120) NOT NULL,
    `ISIC4` VARCHAR(120) NOT NULL,
    `CV` VARCHAR(120) NOT NULL,
    `Salary` VARCHAR(120) NOT NULL,
    `Remarks` VARCHAR(120) NOT NULL,
    `Status` VARCHAR(120) NOT NULL,
    `Suggest By` VARCHAR(120) NOT NULL, 
    `CreateBy` VARCHAR(120) DEFAULT NULL,
    `CreateAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
)

