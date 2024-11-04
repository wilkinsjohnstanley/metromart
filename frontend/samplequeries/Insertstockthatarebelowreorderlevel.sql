INSERT INTO inventory (StoreID, ProductID, StockQuantity, ReorderLevel, Price) VALUES
-- Store 1 (Market Central)
-- Below reorder level items
(3, 1, 8, 20, 4.99),    -- Whole Milk (critically low)
(3, 2, 15, 20, 4.89),   -- Low-fat Milk (low)
(3, 4, 5, 15, 5.99),    -- Ground Beef (critically low)
(3, 7, 4, 12, 5.99),    -- Ice Cream (critically low)
(3, 9, 10, 15, 4.99),   -- Orange Juice (low)

-- Normal stock items
(3, 3, 25, 15, 3.99),   -- Chocolate Milk
(3, 5, 20, 15, 8.99),   -- Chicken Breast
(3, 6, 18, 15, 6.99),   -- Frozen Pizza
(3, 8, 45, 30, 1.99),   -- Cola
(3, 10, 25, 20, 12.99), -- Laundry Detergent

-- Store 2 (Market Express)
-- Below reorder level items
(4, 3, 8, 12, 4.29),    -- Chocolate Milk (low)
(4, 6, 5, 12, 7.49),    -- Frozen Pizza (critically low)
(4, 8, 12, 25, 2.29),   -- Cola (low)
(4, 10, 8, 15, 13.49),  -- Laundry Detergent (low)

-- Normal stock items
(4, 1, 25, 15, 5.29),   -- Whole Milk
(4, 2, 22, 15, 5.19),   -- Low-fat Milk
(4, 4, 18, 12, 6.29),   -- Ground Beef
(4, 5, 16, 12, 9.29),   -- Chicken Breast
(4, 7, 14, 10, 6.29),   -- Ice Cream
(4, 9, 20, 12, 5.29);   -- Orange Juice