SELECT 
    s.StoreName, 
    s.Location, 
    p.ProductName, 
    i.StockQuantity,
    i.ReorderLevel
FROM 
    store s
JOIN 
    inventory i ON s.StoreID = i.StoreID
JOIN 
    product p ON i.ProductID = p.ProductID
WHERE 
    i.StockQuantity < i.ReorderLevel;
