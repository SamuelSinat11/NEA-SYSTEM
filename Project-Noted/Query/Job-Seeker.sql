
CREATE DATABASE IF NOT EXISTS ApplicantDB;
USE ApplicantDB;

-- Applicants Table
CREATE TABLE Applicants (
    RollNumber INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    DateOfBirth DATE NOT NULL,
    PlaceOfBirth VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL UNIQUE
);

-- Applications Table
CREATE TABLE Applications (
    ApplicationID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    AppliedFor VARCHAR(255) NOT NULL,
    Status VARCHAR(50) NOT NULL,
    SuggestBy VARCHAR(255),
    Remarks TEXT,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- Skills Table
CREATE TABLE Skills (
    SkillID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    Skill VARCHAR(255) NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- Education Table
CREATE TABLE Education (
    EducationID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    Education VARCHAR(255) NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- Experience Table
CREATE TABLE Experience (
    ExperienceID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    Company VARCHAR(255) NOT NULL,
    Position VARCHAR(255) NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- ISIC Table
CREATE TABLE ISIC (
    ISICID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    ISIC4 VARCHAR(50) NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- Documents Table
CREATE TABLE Documents (
    DocumentID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    CV TEXT NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);

-- Salary Table
CREATE TABLE Salary (
    SalaryID INT AUTO_INCREMENT PRIMARY KEY,
    RollNumber INT,
    Salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (RollNumber) REFERENCES Applicants(RollNumber) ON DELETE CASCADE
);