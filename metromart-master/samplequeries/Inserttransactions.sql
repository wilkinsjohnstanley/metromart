
-- Insert market basket products (items in each transaction)
INSERT INTO marketbasketproduct (BasketID, ProductID) VALUES
-- Basket 1: Milk + common pairs
(3, 1),  -- Whole Milk
(3, 6),  -- Frozen Pizza
(3, 9),  -- Orange Juice

-- Basket 2: Different milk + pairs
(4, 2),  -- Low-fat Milk
(4, 4),  -- Ground Beef
(4, 7),  -- Ice Cream

-- Basket 3: No milk, other products
(5, 5),  -- Chicken Breast
(5, 8),  -- Cola
(5, 10), -- Laundry Detergent

-- Basket 4: Milk + pairs
(6, 1),  -- Whole Milk
(6, 6),  -- Frozen Pizza
(6, 4),  -- Ground Beef

-- Basket 5: Multiple milk types + pairs
(7, 1),  -- Whole Milk
(7, 3),  -- Chocolate Milk
(7, 7),  -- Ice Cream

-- Basket 6: Milk + multiple pairs
(8, 2),  -- Low-fat Milk
(8, 5),  -- Chicken Breast
(8, 6),  -- Frozen Pizza
(8, 8),  -- Cola

-- Basket 7: Just milk varieties
(9, 1),  -- Whole Milk
(9, 2),  -- Low-fat Milk

-- Basket 8: Milk + pairs
(10, 1),  -- Whole Milk
(10, 4),  -- Ground Beef
(10, 7);  -- Ice Cream