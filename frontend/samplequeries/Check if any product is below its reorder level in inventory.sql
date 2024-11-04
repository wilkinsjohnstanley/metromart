SELECT p.ProductName, i.StockQuantity, i.ReorderLevel
FROM product p
JOIN inventory i ON p.ProductID = i.ProductID
WHERE i.StockQuantity < i.ReorderLevel;
