-- Insert products using existing brands:
-- Brand 1: Coca-Cola
-- Brand 2: Kellogg's
-- Brand 3: Dove
-- Brand 4: Samsung
-- Brand 5: MetroFresh (Private Label)
-- Brand 6: MetroHome (Private Label)

INSERT INTO product (ProductID, ProductName, UPC, Size, Price, ProductTypeID, BrandID) VALUES
-- Dairy products (Type 2) - Using MetroFresh (5) for store brand dairy
(7, 'Whole Milk', '111111', '1 gallon', 4.99, 2, 5),
(8, 'Low-fat Milk', '111112', '1 gallon', 4.89, 2, 5),
(9, 'Chocolate Milk', '111113', '1 quart', 3.99, 2, 5),

-- Meat products (Type 3) - Using MetroFresh (5) for fresh products
(10, 'Ground Beef', '222221', '1 lb', 5.99, 3, 5),
(11, 'Chicken Breast', '222222', '2 lb', 8.99, 3, 5),

-- Frozen Food (Type 4) - Mix of brands
(12, 'Frozen Pizza', '333331', '12 inch', 6.99, 4, 5),
(13, 'Ice Cream', '333332', '1/2 gallon', 5.99, 4, 5),

-- Beverages (Type 5) - Using Coca-Cola (1)
(14, 'Cola', '444441', '2 liter', 1.99, 5, 1),
(15, 'Orange Juice', '444442', '64 oz', 4.99, 5, 5),

-- Cleaning Supplies (Type 7) - Using MetroHome (6) for household items
(16, 'Laundry Detergent', '555551', '100 oz', 12.99, 7, 6);
