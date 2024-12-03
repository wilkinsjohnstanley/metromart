-- BasketID is a foreign key constraint
INSERT INTO MarketBasket (BasketID, PurchaseDate, StoreID, CustomerID) VALUES
(27, "2024-12-03", 5, 1),
(28, "2024-11-14", 6, 1),
(29, "2024-10-17", 7, 1),
(30, "2024-09-23", 8, 1);
INSERT INTO MarketBasketProduct (ProductID, BasketID, Quantity) VALUES
(17, 27, 50), -- Coke Classic, 50 units
(18, 28, 30), -- Diet Coke, 30 units
(19, 29, 20000), -- Pepsi Regular, 20 units
(20, 30, 10000); -- Diet Pepsi, 10 units


