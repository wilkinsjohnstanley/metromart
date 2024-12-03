UPDATE inventory 
SET StockQuantity = 1, ReorderLevel = 10, Price = 1
WHERE StoreID = 4 AND ProductID = 1 AND StockQuantity IS NULL;