CREATE DATABASE IF NOT EXISTS svr_klef;
USE svr_klef;

-- Users Table
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    idNumber VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    role ENUM('superadmin', 'admin') DEFAULT 'admin',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- Activities Table
CREATE TABLE Activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    domain_id INT NOT NULL,
    studentsParticipated INT NOT NULL,
    reportLink TEXT,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- Gallery Table
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
    articleLink TEXT NOT NULL,
    ArticleUrl LONGTEXT
);

-- Awards Table
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,
    image_link TEXT NOT NULL,
    description TEXT NOT NULL,
    award_date DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NEW: HeroImage Table
CREATE TABLE HeroImage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageLink TEXT NOT NULL,
    imageDescription TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Domains Table
CREATE TABLE Domain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Areas Of Work Table
CREATE TABLE AreasOfWork (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    imageLink TEXT NOT NULL,
    domain_id INT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- Focus Areas Table
CREATE TABLE FocusAreas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT NOT NULL,
    description TEXT NOT NULL,
    imageLink TEXT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES Domain(id)
);

-- Initial Users
INSERT INTO User (name, email, password, idNumber, role) 
VALUES (
    'Dinesh Korukonda',
    '2300030350@kluniversity.in',
    '$2b$10$ywQ5ZvLCPhCr26QGTmjFV.tvX8RYKD3eV1lLH2P9e6PKqtcYkLI.q',
    -- 'Dinesh@123',
    '2300030350',
    'superadmin'
);

INSERT INTO User (name, email, password, idNumber, role) 
VALUES (
    'Pavan Karthik',
    '2300032048@kluniversity.in',
    '$2b$10$NZKQC4UwfY/V..FclAewBOfqQUSHQ8tKvAXABTMarOt50YhCZ..vC',
    -- 'Karthik@123',
    '2300032048',
    'admin'
);