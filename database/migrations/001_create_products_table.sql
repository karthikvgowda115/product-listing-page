-- Migration 001: Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_created_at ON products(created_at);