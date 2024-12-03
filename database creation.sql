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
