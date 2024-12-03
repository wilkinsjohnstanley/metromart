-- BasketID is a foreign key constraint
INSERT INTO MarketBasket (BasketID, PurchaseDate, StoreID, CustomerID) VALUES
(23, "2024-12-03", 4, 1),
(24, "2024-11-14", 4, 1),
(25, "2024-10-17", 4, 1),
(26, "2024-09-23", 4, 1);
INSERT INTO MarketBasketProduct (ProductID, BasketID, Quantity) VALUES
(17, 23, 50), -- Coke Classic, 50 units
(18, 24, 30), -- Diet Coke, 30 units
(19, 25, 20000), -- Pepsi Regular, 20 units
(20, 26, 10000); -- Diet Pepsi, 10 units


