-- Select all inventory records
SELECT * FROM inventory;

-- Select specific columns
SELECT ProductID, StockQuantity, Price FROM inventory;

-- Select with a condition
SELECT * FROM inventory WHERE StoreID = 1;

-- Select with multiple conditions
SELECT * FROM inventory WHERE StoreID = 1 AND StockQuantity < ReorderLevel;

-- Select with sorting
SELECT * FROM inventory ORDER BY StockQuantity ASC;

-- Select with limit
SELECT * FROM inventory LIMIT 10;

-- Select with joins (assuming related tables)
SELECT i.*, p.ProductName 
FROM inventory i
JOIN products p ON i.ProductID = p.ProductID;

-- Select with aggregations
SELECT 
    StoreID, 
    COUNT(*) as TotalProducts, 
    SUM(StockQuantity) as TotalStock,
    AVG(Price) as AveragePrice
FROM inventory
GROUP BY StoreID;