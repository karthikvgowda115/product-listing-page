-- Migration 003: Seed products data
INSERT INTO products (name, price, description, short_description, category, image_url, stock) VALUES
-- Innerwear Products
('Cotton Comfort Boxers', 499.99, 'Premium cotton boxers with soft elastic waistband for all-day comfort. Breathable fabric keeps you cool and dry.', 'Soft cotton boxers for everyday comfort', 'innerwear', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 50),
('Silk Touch Briefs', 799.99, 'Luxurious silk blend briefs with seamless design. Ultra-soft fabric with moisture-wicking properties.', 'Luxurious silk blend briefs', 'innerwear', 'https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 30),
('Sports Performance Trunks', 649.99, 'High-performance trunks designed for active lifestyle. Quick-dry fabric with anti-odor technology.', 'Performance trunks for sports enthusiasts', 'innerwear', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 40),
('Organic Cotton Vests', 349.99, '100% organic cotton vests. Hypoallergenic and gentle on sensitive skin. Ribbed neck and armholes.', 'Organic cotton vests for sensitive skin', 'innerwear', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 60),
('Thermal Long Johns', 899.99, 'Winter thermal innerwear with保暖 technology. Lightweight yet provides excellent warmth retention.', 'Winter thermal wear for cold weather', 'innerwear', 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 25),
('Seamless Panties 3-Pack', 999.99, 'Set of 3 seamless panties in assorted colors. No-show design perfect under tight clothing.', '3-pack seamless panties set', 'innerwear', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 35),

-- Additional products for variety
('Lace Trim Camisole', 599.99, 'Elegant camisole with delicate lace trim. Perfect for layering or wearing as nightwear.', 'Elegant lace-trimmed camisole', 'women', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 45),
('Compression Shorts', 749.99, 'Athletic compression shorts with muscle support. Improves blood circulation during workouts.', 'Muscle support compression shorts', 'men', 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 20),
('Kids Character Underwear', 399.99, 'Fun character-themed underwear for kids. Made from soft, child-friendly fabrics.', 'Character-themed underwear for kids', 'kids', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 55),
('Bamboo Fiber Boxers', 849.99, 'Eco-friendly boxers made from bamboo fiber. Naturally antibacterial and super soft.', 'Eco-friendly bamboo fiber boxers', 'men', 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 30);

-- Update timestamps to vary slightly
UPDATE products SET created_at = DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY);