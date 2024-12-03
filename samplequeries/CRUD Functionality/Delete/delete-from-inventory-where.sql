-- Delete a specific inventory record
DELETE FROM inventory 
WHERE ProductID = 1 AND StoreID = 1;

-- Delete all records below a certain stock level
DELETE FROM inventory 
WHERE StockQuantity < 10;

-- Conditional delete
DELETE FROM inventory 
WHERE Price < 5 AND StockQuantity = 0;