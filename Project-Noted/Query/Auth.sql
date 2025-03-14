
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
CREATE TABLE `jobseeker` (
    `Roll_id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `FullName` VARCHAR(120) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
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

INSERT INTO `jobseeker`(`Roll Number`, `FullName`, `Gender`, `Date of Birth`, `Place of Birth`, `PhoneNumber`, `AppliedFor`, `Skill`, `Education`, `Company`, `Postion`, `ISIC4`, `CV`, `Salary`, `Remarks`, `Status`, `Suggest By`, `CreateBy`, `CreateAt`) 
VALUES 
('1001', 'John Doe', 'Male', '1995-06-15', 'New York', '1234567890', 'Software Engineer', 'Java, React', 'BSc CS', 'Google', 'Developer', '6201', 'john_cv.pdf', '80000', 'Experienced', 'Active', 'Recruiter A', 'Admin', NOW()),
('1002', 'Jane Smith', 'Female', '1997-08-22', 'Los Angeles', '9876543210', 'Data Analyst', 'Python, SQL', 'MSc Data Science', 'Amazon', 'Analyst', '6202', 'jane_cv.pdf', '75000', 'Data expert', 'Active', 'Recruiter B', 'Admin', NOW()),
('1003', 'Michael Johnson', 'Male', '1992-05-10', 'Chicago', '4561237890', 'Frontend Developer', 'HTML, CSS, JavaScript', 'BSc IT', 'Facebook', 'Designer', '6203', 'michael_cv.pdf', '72000', 'Creative mindset', 'Active', 'Recruiter C', 'Admin', NOW()),
('1004', 'Emily Davis', 'Female', '1993-11-30', 'Houston', '7418529630', 'Backend Developer', 'Node.js, MongoDB', 'BSc CS', 'Microsoft', 'Engineer', '6204', 'emily_cv.pdf', '90000', 'Strong backend skills', 'Active', 'Recruiter D', 'Admin', NOW()),
('1005', 'David Wilson', 'Male', '1998-02-18', 'San Francisco', '3698521470', 'UI/UX Designer', 'Figma, Adobe XD', 'BFA Design', 'Apple', 'Designer', '6205', 'david_cv.pdf', '78000', 'Creative UI/UX', 'Active', 'Recruiter E', 'Admin', NOW()),
('1006', 'Sophia Martinez', 'Female', '1996-07-25', 'Seattle', '8529637410', 'Project Manager', 'Agile, Scrum', 'MBA', 'Tesla', 'Manager', '6206', 'sophia_cv.pdf', '95000', 'Good leadership', 'Active', 'Recruiter F', 'Admin', NOW()),
('1007', 'Daniel Anderson', 'Male', '1994-04-12', 'Boston', '1237894560', 'Full Stack Developer', 'MERN Stack', 'BSc CS', 'Netflix', 'Developer', '6207', 'daniel_cv.pdf', '98000', 'Versatile dev', 'Active', 'Recruiter G', 'Admin', NOW()),
('1008', 'Olivia Taylor', 'Female', '1999-09-05', 'Denver', '7894561230', 'Marketing Specialist', 'SEO, Google Ads', 'MBA Marketing', 'Adobe', 'Marketer', '6208', 'olivia_cv.pdf', '73000', 'SEO expert', 'Active', 'Recruiter H', 'Admin', NOW()),
('1009', 'James Brown', 'Male', '1990-12-15', 'Austin', '9637418520', 'Cybersecurity Expert', 'Network Security', 'MSc Cybersecurity', 'Cisco', 'Security Analyst', '6209', 'james_cv.pdf', '105000', 'Strong security skills', 'Active', 'Recruiter I', 'Admin', NOW()),
('1010', 'Emma White', 'Female', '1991-03-08', 'Miami', '1478523690', 'HR Manager', 'Recruitment, Training', 'MBA HR', 'Oracle', 'HR Head', '6210', 'emma_cv.pdf', '89000', 'Good team player', 'Active', 'Recruiter J', 'Admin', NOW());


