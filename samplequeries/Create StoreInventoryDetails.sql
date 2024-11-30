CREATE TABLE StoreInventoryDetails (
    id INT PRIMARY KEY,
    StoreName VARCHAR(255),
    Location VARCHAR(255),
    ProductName VARCHAR(255),
    StockQuantity INT,
    ReorderLevel INT
);
