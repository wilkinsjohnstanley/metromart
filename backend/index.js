//create express application
import express from "express"
import mysql from "mysql"
import cors from "cors"

//initialize express
const app = express()
//middleware
app.use(express.json())
app.use(cors())

//connect to MySQL database
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"metromart"
})
//friendly message to developer who started the server
app.listen(8800, ()=>{
    console.log("You have launched the backend successfully ")
})

//a simple test of the get method
//if you type localhost:8800 into the browser you will see the message
app.get("/", (req, res)=>{
    res.json("You did it.")
})
//select everything from the products table
app.get("/products", (req, res)=>{
    const q = "SELECT*FROM product"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

//Inventory Mangement System: Tell me the store, product, and reorder information on items that are low in the inventory.
app.get("/inventory", (req, res)=>{
    const q = "SELECT  s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID WHERE i.StockQuantity < i.ReorderLevel;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

//Queries explicitly asked for by the Professor.
//The data is retrieved using a SQL query and send to these server pages.
//We can then access the elements we want on the front end.
//Top 20 selling-products at each store
app.get("/top20ByStore", (req, res)=>{
    const q = "WITH ProductSales AS ( SELECT  s.StoreID, s.StoreName, p.ProductID, p.ProductName, COUNT(*) as SalesCount,  RANK() OVER (PARTITION BY s.StoreID ORDER BY COUNT(*) DESC) as RankInStore FROM marketbasket mb  JOIN store s ON mb.StoreID = s.StoreID  JOIN marketbasketproduct mbp ON mb.BasketID = mbp.BasketID  JOIN product p ON mbp.ProductID = p.ProductID GROUP BY s.StoreID, s.StoreName, p.ProductID, p.ProductName ) SELECT StoreID,    StoreName,    ProductName,    SalesCount FROM ProductSales WHERE RankInStore <= 20 ORDER BY StoreID, RankInStore;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
//Top 20 selling-products in each state
app.get("/top20ByState", (req, res)=>{
    const q = "WITH ProductSalesByState AS (	SELECT 	p.ProductID,   	p.ProductName,   	SUBSTRING_INDEX(s.Location, ', ', -2) AS State,   	SUM(mp.Quantity) AS TotalQuantitySold,   	ROW_NUMBER() OVER (PARTITION BY SUBSTRING_INDEX(s.Location, ', ', -2) ORDER BY SUM(mp.Quantity) DESC) AS StateRank	FROM   	Product p   	JOIN MarketBasketProduct mp ON p.ProductID = mp.ProductID   	JOIN MarketBasket mb ON mp.BasketID = mb.BasketID   	JOIN Store s ON mb.StoreID = s.StoreID	GROUP BY   	p.ProductID, p.ProductName, SUBSTRING_INDEX(s.Location, ', ', -2) )SELECT	ProductID,	ProductName,	State,	TotalQuantitySold FROM	ProductSalesByState WHERE	StateRank <= 20 ORDER BY	State, TotalQuantitySold DESC;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
//What are the 5 stores with the most sales?
app.get("/top5stores", (req, res)=>{
    const q = "SELECT	s.StoreID,	s.Location,	SUM(p.Price * mp.Quantity) AS TotalSales FROM	Store s	JOIN MarketBasket mb ON s.StoreID = mb.StoreID	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID	JOIN Product p ON mp.ProductID = p.ProductID WHERE	YEAR(mb.PurchaseDate) = YEAR(CURDATE()) GROUP BY	s.StoreID, s.Location ORDER BY	TotalSales DESC LIMIT 5;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
//In how many stores does Coke outsell Pepsi?
app.get("/cokeVsPepsi", (req, res)=>{
    const q = "WITH CokePepsiSales AS (	SELECT    	s.StoreID,    	SUM(CASE WHEN p.ProductName LIKE '%Coke%' THEN mp.Quantity ELSE 0 END) AS CokeSales,    	SUM(CASE WHEN p.ProductName LIKE '%Pepsi%' THEN mp.Quantity ELSE 0 END) AS PepsiSales	FROM    	Store s    	JOIN MarketBasket mb ON s.StoreID = mb.StoreID    	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID    	JOIN Product p ON mp.ProductID = p.ProductID	WHERE    	p.ProductName LIKE '%Coke%' OR p.ProductName LIKE '%Pepsi%'	GROUP BY    	s.StoreID) SELECT COUNT(*) AS StoresWhereCokeOutsellsPepsi FROM CokePepsiSales WHERE CokeSales > PepsiSales;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
//What are the top 3 types of products that customers buy in addition to milk?
app.get("/top3WithMilk", (req, res)=>{
    const q = "WITH MilkPurchases AS (    SELECT DISTINCT mb.BasketID    FROM MarketBasket mb    JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID    JOIN Product p ON mp.ProductID = p.ProductID    WHERE p.ProductName LIKE '%Milk%'),OtherProducts AS (    SELECT        p.ProductTypeID,       p.ProductName,       COUNT(*) AS PurchaseCount    FROM        MilkPurchases mp   JOIN MarketBasketProduct mbp ON mp.BasketID = mbp.BasketID   JOIN Product p ON mbp.ProductID = p.ProductID   WHERE       p.ProductName NOT LIKE '%Milk%'   GROUP BY       p.ProductTypeID,       p.ProductName ) SELECT ProductTypeID, ProductName, PurchaseCount FROM OtherProducts ORDER BY PurchaseCount DESC LIMIT 3;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})