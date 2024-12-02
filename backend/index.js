import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "metromart"
})
//Allows us to send any json file using a client
app.use(express.json())

//<----------------For the shop page. Display the items-------------------------------->
// app.get('/product', (req, res) => {
//     db.query('SELECT * FROM product', (err, result) => {
//         if (err) {
//             res.status(500).json({ error: 'Database error' });
//             return;
//         }
//         res.json(result); // Send the query result as the response
//     });
// });
app.get('/product', (req, res) => {
    db.query('SELECT * FROM product', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        // Map database columns to camelCase
        const mappedResult = result.map(product => ({
            id: product.ProductID,
            name: product.ProductName,
            size: product.Size,
            price: product.Price
        }));
        res.json(mappedResult);
    });
});
//<----------------Inventory table-------------------------------->

app.get("/inventory", (req, res)=>{
    const q = "SELECT p.ProductID,s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID;";
    db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json(data);
      });
    });

/*<---------- Below Reorder Level Table ----------------------------------------------------------> */
//Below Reorder Level: Tell me the store, product, and reorder information on items that are low in the inventory.
app.get("/reorder", (req, res)=>{
    const q = "SELECT  p.ProductID, s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID WHERE i.StockQuantity < i.ReorderLevel;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})
//Reorder items!
app.put("/reorder/:ProductID", (req, res) => {
    const productId = req.params.ProductID;
    const q = "UPDATE inventory SET StockQuantity = 1000 WHERE ProductID = ?";

  
    // const values = [
    //   req.body.StockQuantity
    // ];
  
    // db.query(q, [...values,productId], (err, data) => {
    db.query(q, [productId], (err, data) => {

      if (err) return res.send(err);
      return res.json(data);
    });
  });

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




app.listen(8800, () => {
    console.log("Backend server is running on port 8800")
})

export default app;