-- Create Database
CREATE DATABASE MetroMart;
USE MetroMart;

-- Create Store Table
CREATE TABLE Store (
	StoreID INT AUTO_INCREMENT PRIMARY KEY,
	StoreName VARCHAR(100),
	Location VARCHAR(255),
	HoursOfOperation VARCHAR(50)
);

-- Create ProductType Table (to handle product hierarchy)
CREATE TABLE ProductType (
	ProductTypeID INT AUTO_INCREMENT PRIMARY KEY,
	ProductTypeName VARCHAR(100),
	ParentTypeID INT NULL,
	FOREIGN KEY (ParentTypeID) REFERENCES ProductType(ProductTypeID)
);

-- Create Brand Table
CREATE TABLE Brand (
	BrandID INT AUTO_INCREMENT PRIMARY KEY,
	BrandName VARCHAR(100),
	IsPrivateLabel BOOLEAN
);

-- Create Vendor Table
CREATE TABLE Vendor (
	VendorID INT AUTO_INCREMENT PRIMARY KEY,
	VendorName VARCHAR(100),
	ContactInfo VARCHAR(255)
);

-- Create Product Table
CREATE TABLE Product (
	ProductID INT AUTO_INCREMENT PRIMARY KEY,
	ProductName VARCHAR(100),
	UPC VARCHAR(20) UNIQUE,
	Size VARCHAR(50),
	Price DECIMAL(10, 2),
	ProductTypeID INT,
	BrandID INT,
	FOREIGN KEY (ProductTypeID) REFERENCES ProductType(ProductTypeID),
	FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
);

-- Create Inventory Table
CREATE TABLE Inventory (
	StoreID INT,
	ProductID INT,
	StockQuantity INT,
	ReorderLevel INT,
	Price DECIMAL(10, 2),
	PRIMARY KEY (StoreID, ProductID),
	FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Create Customer Table
CREATE TABLE Customer (
	CustomerID INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(100),
	Email VARCHAR(100),
	PhoneNumber VARCHAR(20),
	Address VARCHAR(255),
	IsFrequentShopper BOOLEAN
);

-- Create MarketBasket Table (to store customer transactions)
CREATE TABLE MarketBasket (
	BasketID INT AUTO_INCREMENT PRIMARY KEY,
	PurchaseDate DATE,
	StoreID INT,
	CustomerID INT NULL,
	FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Create MarketBasketProduct Table (Products in each basket)
CREATE TABLE MarketBasketProduct (
	BasketID INT,
	ProductID INT,
	Quantity INT,
	PRIMARY KEY (BasketID, ProductID),
	FOREIGN KEY (BasketID) REFERENCES MarketBasket(BasketID),
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Create WebOrder Table
CREATE TABLE WebOrder (
	OrderID INT AUTO_INCREMENT PRIMARY KEY,
	OrderDate DATE,
	CustomerID INT,
	DeliveryAddress VARCHAR(255),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Create WebOrderProduct Table (Products in web orders)
CREATE TABLE WebOrderProduct (
	OrderID INT,
	ProductID INT,
	Quantity INT,
	PRIMARY KEY (OrderID, ProductID),
	FOREIGN KEY (OrderID) REFERENCES WebOrder(OrderID),
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

INSERT INTO ProductType (ProductTypeName, ParentTypeID) VALUES
('Groceries', NULL),
('Dairy', 1),
('Meat', 1),
('Frozen Food', 1),
('Beverages', 1),
('Household Items', NULL),
('Cleaning Supplies', 6),
('Kitchen Appliances', 6),
('Personal Care', NULL),
('Skincare', 9),
('Hygiene', 9),
('Pharmaceuticals', 9);

INSERT INTO Brand (BrandName, IsPrivateLabel) VALUES
('Coca-Cola', FALSE),
('Kellogg\'s', FALSE),
('Dove', FALSE),
('Samsung', FALSE),
('MetroFresh', TRUE),
('MetroHome', TRUE);

INSERT INTO Vendor (VendorName, ContactInfo) VALUES
('PepsiCo', 'contact@pepsico.com'),
('Unilever', 'contact@unilever.com'),
('Procter & Gamble', 'contact@pg.com');

INSERT INTO Store (StoreName, Location, HoursOfOperation) VALUES
('MetroMart Downtown', '123 Main St, Cityville', '9 AM - 9 PM'),
('MetroMart Suburb', '456 Oak St, Townsville', '8 AM - 10 PM');

INSERT INTO Product (ProductName, UPC, Size, Price, ProductTypeID, BrandID) VALUES
('Coca-Cola Can', '123456789012', '12 oz', 1.00, 5, 1),  -- Beverage, Coca-Cola
('Kellogg\'s Corn Flakes', '234567890123', '18 oz', 3.50, 1, 2),  -- Groceries, Kellogg's
('Dove Body Wash', '345678901234', '16 oz', 6.99, 11, 3),  -- Personal Care, Dove
('Samsung TV 40"', '456789012345', '40 inch', 299.99, 7, 4),  -- Electronics, Samsung
('MetroFresh Milk', '567890123456', '1 Gallon', 2.99, 2, 5),  -- Dairy, MetroFresh
('MetroHome Dish Soap', '678901234567', '32 oz', 2.50, 6, 6);  -- Household, MetroHome

INSERT INTO Inventory (StoreID, ProductID, StockQuantity, ReorderLevel, Price) VALUES
(1, 1, 100, 10, 1.00),  -- Coca-Cola Can at Downtown
(1, 2, 50, 5, 3.50),	-- Kellogg's Corn Flakes at Downtown
(1, 3, 30, 3, 6.99),	-- Dove Body Wash at Downtown
(2, 1, 200, 20, 1.05),  -- Coca-Cola Can at Suburb
(2, 2, 60, 6, 3.45),	-- Kellogg's Corn Flakes at Suburb
(2, 3, 40, 4, 6.89);	-- Dove Body Wash at Suburb

INSERT INTO Customer (Name, Email, PhoneNumber, Address, IsFrequentShopper) VALUES
('John Doe', 'johndoe@example.com', '555-1234', '789 Pine St, Cityville', TRUE),
('Jane Smith', 'janesmith@example.com', '555-5678', '101 Maple St, Townsville', FALSE);

INSERT INTO MarketBasket (PurchaseDate, StoreID, CustomerID) VALUES
('2023-09-15', 1, 1),  -- John Doe made a purchase at MetroMart Downtown
('2023-09-16', 2, NULL);  -- Anonymous purchase at MetroMart Suburb

INSERT INTO MarketBasketProduct (BasketID, ProductID, Quantity) VALUES
(1, 1, 2),  -- John Doe bought 2 Coca-Cola Cans
(1, 3, 1),  -- John Doe bought 1 Dove Body Wash
(2, 1, 6),  -- Anonymous customer bought 6 Coca-Cola Cans
(2, 2, 1);  -- Anonymous customer bought 1 Kellogg's Corn Flakes

INSERT INTO WebOrder (OrderDate, CustomerID, DeliveryAddress) VALUES
('2023-09-17', 1, '789 Pine St, Cityville');

INSERT INTO WebOrderProduct (OrderID, ProductID, Quantity) VALUES
(1, 1, 12),  -- John Doe ordered 12 Coca-Cola Cans
(1, 2, 1);   -- John Doe ordered 1 Kellogg's Corn Flakes
