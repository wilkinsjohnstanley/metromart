-- Add inventory records for these products
INSERT INTO inventory (StoreID, ProductID, StockQuantity, ReorderLevel, Price) VALUES
(3, 11, 50, 30, 1.99),  -- Coke Classic at Market Central
(3, 12, 45, 30, 1.99),  -- Diet Coke at Market Central
(3, 13, 40, 30, 1.99),  -- Pepsi Regular at Market Central
(3, 14, 35, 30, 1.99),  -- Diet Pepsi at Market Central
(4, 11, 55, 35, 2.29),  -- Coke Classic at Market Express
(4, 12, 48, 35, 2.29),  -- Diet Coke at Market Express
(4, 13, 42, 35, 2.29),  -- Pepsi Regular at Market Express
(4, 14, 38, 35, 2.29);  -- Diet Pepsi at Market Express