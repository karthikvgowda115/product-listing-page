-- Migration 004: Add sample cart items for demo
-- Note: Use this only for demonstration/testing purposes

INSERT INTO cart_items (session_id, product_id, quantity) VALUES
('demo-session-123', 1, 2),
('demo-session-123', 3, 1),
('demo-session-123', 5, 1);

-- Update product stock accordingly
UPDATE products SET stock = stock - 2 WHERE id = 1;
UPDATE products SET stock = stock - 1 WHERE id = 3;
UPDATE products SET stock = stock - 1 WHERE id = 5;