CREATE DATABASE IF NOT EXISTS svr_klef;
USE svr_klef;
-- Enum for Role
CREATE TABLE Role (
    value ENUM('superadmin', 'admin') NOT NULL
);

-- Users Table
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    idNumber VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'admin') DEFAULT 'admin',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table (modified)
CREATE TABLE Activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    domain_id INT NOT NULL,
    studentsParticipated INT NOT NULL,
    reportLink TEXT,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- Gallery Table (modified)
CREATE TABLE Gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heroImageLink TEXT,
    imageLink TEXT NOT NULL,
    domain_id INT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- News Table
CREATE TABLE News (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    articleLink TEXT NOT NULL
);

CREATE TABLE awards (
    id SERIAL PRIMARY KEY,
    image_link TEXT NOT NULL,
    description TEXT NOT NULL,
    award_date DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------- 
-- Hero Section Table
CREATE TABLE HeroSection (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageLink TEXT NOT NULL,
    title VARCHAR(255) NOT NULL
);

-- Domains Table (modified)
CREATE TABLE Domain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Areas Of Work Table (modified)
CREATE TABLE AreasOfWork (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    imageLink TEXT NOT NULL,
    domain_id INT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- New FocusAreas Table
CREATE TABLE FocusAreas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT NOT NULL,
    description TEXT NOT NULL,
    imageLink TEXT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

INSERT INTO User (name, email, password, idNumber, role) 
VALUES (
    'Dinesh Korukonda',
    '2300030350@kluniversity.in',
    '$2b$10$cZpu99ppHs/uCptP7PZUOe3BQsdtBprieZwOemayR6V82D68GIC5S',  -- Replace with actual bcrypt hash
    '2300030350',
    'superadmin'
);

-- Create admin user
-- Password is 'admin123' (hashed)
INSERT INTO User (name, email, password, idNumber, role) 
VALUES (
    'Pavan Karthik',
    '2300032048@kluniversity.in',
    '$$2b$10$bMD42XOo08Wt44oRp1l/Se6ruS.7wk4uksL15PmmFRuQBsi1RuHaS',  -- Replace with actual bcrypt hash
    '2300032048',
    'admin'
);