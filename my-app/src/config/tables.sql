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

-- Activities Table
CREATE TABLE Activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    domain VARCHAR(255) NOT NULL,
    studentsParticipated INT NOT NULL,
    reportLink TEXT
);

-- Gallery Table
CREATE TABLE Gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heroImageLink TEXT,
    imageLink TEXT NOT NULL,
    imageDomain VARCHAR(255) NOT NULL
);

-- News Table
CREATE TABLE News (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    articleImage TEXT NOT NULL,
    articleLink TEXT NOT NULL
);

-- Hero Section Table
CREATE TABLE HeroSection (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageLink TEXT NOT NULL,
    title VARCHAR(255) NOT NULL
);

-- Domains Table
CREATE TABLE Domain (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    imageLink TEXT NOT NULL
);

-- Areas Of Work Table
CREATE TABLE AreasOfWork (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);
