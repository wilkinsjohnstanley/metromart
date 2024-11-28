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

// Existing routes remain the same...
app.get('/product', (req, res) => {
    db.query('SELECT * FROM product', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
        // Transform the data inside the callback
        const transformedData = result.map(item => ({
            id: item.ProductID,
            name: item.ProductName,
            size: item.Size,
            price: parseFloat(item.Price).toFixed(2),
        }));
        
        //console.log('Transformed data for frontend:', transformedData);
        res.json(transformedData);
    });
});
/*<---------- CRUD for Inventory Table ----------------------------------------------------------> */
//Create
// app.post("/inventory", (req, res) => {
//     const { StoreID, ProductID, StockQuantity, ReorderLevel } = req.body;
//     const q = "INSERT INTO inventory (StoreID, ProductID, StockQuantity, ReorderLevel) VALUES (?, ?, ?, ?)";
    
//     db.query(q, [StoreID, ProductID, StockQuantity, ReorderLevel], (err, data) => {
//         if (err) return res.json(err);
//         return res.json({ message: "Inventory entry added successfully", data });
//     });
// });
//<----------------CRUD for StoreInventoryDetails-------------------------------->
//Display Store Inventory Details for all stores
app.get("/StoreInventoryDetails", (req, res)=>{
    const q = "SELECT * FROM StoreInventoryDetails";
    db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json(data);
      });
    });
app.post("/StoreInventoryDetails", (req, res) =>{
    const q = "INSERT INTO StoreInventoryDetails (`StoreName`, `Location`, `ProductName`, `StockQuantity`, `ReorderLevel`) VALUES (?)";
    const values = [
        req.body.StoreName,
        req.body.Location,
        req.body.ProductName,
        req.body.StockQuantity,
        req.body.ReorderLevel
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
            return res.json(data);
    })
})
app.delete("/StoreInventoryDetails/:id", (req, res) => {
    const detailId = req.params.id;
    const q = " DELETE FROM StoreInventoryDetails WHERE id = ? ";
  
    db.query(q, [detailId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/StoreInventoryDetails/:id", (req, res) => {
    const detailId = req.params.id;
    const q = "UPDATE StoreInventoryDetails SET `StoreName`= ?, `Location`= ?, `ProductName`= ?, `StockQuantity`= ?, `ReorderLevel`= ? WHERE id = ?";
  
    const values = [
        req.body.StoreName,
        req.body.Location,
        req.body.ProductName,
        req.body.StockQuantity,
        req.body.ReorderLevel
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

//<-----------------------------------------------Analytics only----------------------------------------------------------->
//READ
//Display Inventory for all stores
app.get("/inventory", (req, res)=>{
    const q = "SELECT s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID;";
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})


//UPDATE
app.put("/inventory/:InventoryID", (req, res) => {
    const { StockQuantity, ReorderLevel } = req.body;
    const { InventoryID } = req.params;
    const q = "UPDATE inventory SET StockQuantity = ?, ReorderLevel = ? WHERE InventoryID = ?";
    
    db.query(q, [StockQuantity, ReorderLevel, InventoryID], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "Inventory entry updated successfully", data });
    });
});
//DELETE
app.delete("/inventory/:InventoryID", (req, res) => {
    const { InventoryID } = req.params;
    const q = "DELETE FROM inventory WHERE InventoryID = ?";
    
    db.query(q, [InventoryID], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "Inventory entry deleted successfully", data });
    });
});


/*<---------- END OF CRUD for Inventory Table ----------------------------------------------------------> */
//Below Reorder Level: Tell me the store, product, and reorder information on items that are low in the inventory.
app.get("/reorder", (req, res)=>{
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
// // CREATE - Add new inventory item
// app.post("/inventory", (req, res) => {
//     const { StoreName, Location, ProductName, StockQuantity } = req.body;
    
//     // First, get StoreID and ProductID based on names
//     const findIdsQuery = `
//         SELECT s.StoreID, p.ProductID 
//         FROM store s, product p 
//         WHERE s.StoreName = ? 
//         AND p.ProductName = ?
//     `;
    
//     db.query(findIdsQuery, [StoreName, ProductName], (err, idResults) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
        
//         if (idResults.length === 0) {
//             return res.status(404).json({ error: "Store or Product not found" });
//         }
        
//         const { StoreID, ProductID } = idResults[0];
        
//         // Now insert into inventory
//         const insertQuery = `
//             INSERT INTO inventory (StoreID, ProductID, StockQuantity) 
//             VALUES (?, ?, ?)
//         `;
        
//         db.query(insertQuery, [StoreID, ProductID, StockQuantity], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: "Database error", details: err });
//             }
//             res.status(201).json({ message: "Inventory item added successfully", id: result.insertId });
//         });
//     });
// });

// // UPDATE - Update inventory item
// app.put("/inventory/:id", (req, res) => {
//     const inventoryId = req.params.id;
//     const { StoreName, Location, ProductName, StockQuantity } = req.body;
    
//     // First, get StoreID and ProductID based on names
//     const findIdsQuery = `
//         SELECT s.StoreID, p.ProductID 
//         FROM store s, product p 
//         WHERE s.StoreName = ? 
//         AND p.ProductName = ?
//     `;
    
//     db.query(findIdsQuery, [StoreName, ProductName], (err, idResults) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
        
//         if (idResults.length === 0) {
//             return res.status(404).json({ error: "Store or Product not found" });
//         }
        
//         const { StoreID, ProductID } = idResults[0];
        
//         // Now update inventory
//         const updateQuery = `
//             UPDATE inventory 
//             SET StoreID = ?, ProductID = ?, StockQuantity = ? 
//             WHERE InventoryID = ?
//         `;
        
//         db.query(updateQuery, [StoreID, ProductID, StockQuantity, inventoryId], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: "Database error", details: err });
//             }
            
//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ error: "Inventory item not found" });
//             }
            
//             res.json({ message: "Inventory updated successfully" });
//         });
//     });
// });

// // DELETE - Remove inventory item
// app.delete("/inventory/:id", (req, res) => {
//     const inventoryId = req.params.id;
    
//     const query = "DELETE FROM inventory WHERE InventoryID = ?";
    
//     db.query(query, [inventoryId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
        
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Inventory item not found" });
//         }
        
//         res.json({ message: "Inventory item deleted successfully" });
//     });
// });

// RESTOCK - Increase inventory for items below reorder level
app.post("/restock/:id", (req, res) => {
    const inventoryId = req.params.id;
    
    // First get the current inventory details
    const getInventoryQuery = `
        SELECT StockQuantity, ReorderLevel 
        FROM inventory 
        WHERE InventoryID = ?
    `;
    
    db.query(getInventoryQuery, [inventoryId], (err, inventoryResult) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        
        if (inventoryResult.length === 0) {
            return res.status(404).json({ error: "Inventory item not found" });
        }
        
        const { StockQuantity, ReorderLevel } = inventoryResult[0];
        
        // Calculate restock amount (bring stock up to 150% of reorder level)
        const targetQuantity = Math.ceil(ReorderLevel * 1.5);
        const newQuantity = Math.max(targetQuantity, StockQuantity);
        
        // Update the inventory with new quantity
        const updateQuery = `
            UPDATE inventory 
            SET StockQuantity = ? 
            WHERE InventoryID = ?
        `;
        
        db.query(updateQuery, [newQuantity, inventoryId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err });
            }
            
            res.json({ 
                message: "Inventory restocked successfully",
                oldQuantity: StockQuantity,
                newQuantity: newQuantity
            });
        });
    });
});

app.listen(8800, () => {
    console.log("Backend server is running on port 8800")
})

export default app;
// //create express application
// import express from "express"
// import mysql from "mysql"
// import cors from "cors"

// //initialize express
// const app = express()
// //middleware
// app.use(express.json())
// app.use(cors())

// //connect to MySQL database
// const db= mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"password",
//     database:"metromart"
// })
// //friendly message to developer who started the server
// app.listen(8800, ()=>{
//     console.log("You have launched the backend successfully ")
// })

// //a simple test of the get method
// //if you type localhost:8800 into the browser you will see the message
// app.get("/", (req, res)=>{
//     res.json("You did it.")
// })
// //Endpoint to get all the products
// // Endpoint to get all products
// // Corrected /product endpoint
// app.get('/product', (req, res) => {
//     db.query('SELECT * FROM product', (err, result) => {
//         if (err) {
//             res.status(500).json({ error: 'Database error' });
//             return;
//         }
        
//         // Transform the data inside the callback
//         const transformedData = result.map(item => ({
//             id: item.ProductID,
//             name: item.ProductName,
//             size: item.Size,
//             price: parseFloat(item.Price).toFixed(2),
//         }));
        
//         console.log('Transformed data for frontend:', transformedData);
//         res.json(transformedData);
//     });
// });

// //Display Inventory for all stores
// app.get("/inventory", (req, res)=>{
//     const q = "SELECT s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID;";
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })

// //Below Reorder Level: Tell me the store, product, and reorder information on items that are low in the inventory.
// app.get("/reorder", (req, res)=>{
//     const q = "SELECT  s.StoreName, s.Location, p.ProductName, i.StockQuantity, i.ReorderLevel FROM store s JOIN inventory i ON s.StoreID = i.StoreID JOIN product p ON i.ProductID = p.ProductID WHERE i.StockQuantity < i.ReorderLevel;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })

// //Queries explicitly asked for by the Professor.
// //The data is retrieved using a SQL query and send to these server pages.
// //We can then access the elements we want on the front end.
// //Top 20 selling-products at each store
// app.get("/top20ByStore", (req, res)=>{
//     const q = "WITH ProductSales AS ( SELECT  s.StoreID, s.StoreName, p.ProductID, p.ProductName, COUNT(*) as SalesCount,  RANK() OVER (PARTITION BY s.StoreID ORDER BY COUNT(*) DESC) as RankInStore FROM marketbasket mb  JOIN store s ON mb.StoreID = s.StoreID  JOIN marketbasketproduct mbp ON mb.BasketID = mbp.BasketID  JOIN product p ON mbp.ProductID = p.ProductID GROUP BY s.StoreID, s.StoreName, p.ProductID, p.ProductName ) SELECT StoreID,    StoreName,    ProductName,    SalesCount FROM ProductSales WHERE RankInStore <= 20 ORDER BY StoreID, RankInStore;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })
// //Top 20 selling-products in each state
// app.get("/top20ByState", (req, res)=>{
//     const q = "WITH ProductSalesByState AS (	SELECT 	p.ProductID,   	p.ProductName,   	SUBSTRING_INDEX(s.Location, ', ', -2) AS State,   	SUM(mp.Quantity) AS TotalQuantitySold,   	ROW_NUMBER() OVER (PARTITION BY SUBSTRING_INDEX(s.Location, ', ', -2) ORDER BY SUM(mp.Quantity) DESC) AS StateRank	FROM   	Product p   	JOIN MarketBasketProduct mp ON p.ProductID = mp.ProductID   	JOIN MarketBasket mb ON mp.BasketID = mb.BasketID   	JOIN Store s ON mb.StoreID = s.StoreID	GROUP BY   	p.ProductID, p.ProductName, SUBSTRING_INDEX(s.Location, ', ', -2) )SELECT	ProductID,	ProductName,	State,	TotalQuantitySold FROM	ProductSalesByState WHERE	StateRank <= 20 ORDER BY	State, TotalQuantitySold DESC;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })
// //What are the 5 stores with the most sales?
// app.get("/top5stores", (req, res)=>{
//     const q = "SELECT	s.StoreID,	s.Location,	SUM(p.Price * mp.Quantity) AS TotalSales FROM	Store s	JOIN MarketBasket mb ON s.StoreID = mb.StoreID	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID	JOIN Product p ON mp.ProductID = p.ProductID WHERE	YEAR(mb.PurchaseDate) = YEAR(CURDATE()) GROUP BY	s.StoreID, s.Location ORDER BY	TotalSales DESC LIMIT 5;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })
// //In how many stores does Coke outsell Pepsi?
// app.get("/cokeVsPepsi", (req, res)=>{
//     const q = "WITH CokePepsiSales AS (	SELECT    	s.StoreID,    	SUM(CASE WHEN p.ProductName LIKE '%Coke%' THEN mp.Quantity ELSE 0 END) AS CokeSales,    	SUM(CASE WHEN p.ProductName LIKE '%Pepsi%' THEN mp.Quantity ELSE 0 END) AS PepsiSales	FROM    	Store s    	JOIN MarketBasket mb ON s.StoreID = mb.StoreID    	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID    	JOIN Product p ON mp.ProductID = p.ProductID	WHERE    	p.ProductName LIKE '%Coke%' OR p.ProductName LIKE '%Pepsi%'	GROUP BY    	s.StoreID) SELECT COUNT(*) AS StoresWhereCokeOutsellsPepsi FROM CokePepsiSales WHERE CokeSales > PepsiSales;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })
// //What are the top 3 types of products that customers buy in addition to milk?
// app.get("/top3WithMilk", (req, res)=>{
//     const q = "WITH MilkPurchases AS (    SELECT DISTINCT mb.BasketID    FROM MarketBasket mb    JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID    JOIN Product p ON mp.ProductID = p.ProductID    WHERE p.ProductName LIKE '%Milk%'),OtherProducts AS (    SELECT        p.ProductTypeID,       p.ProductName,       COUNT(*) AS PurchaseCount    FROM        MilkPurchases mp   JOIN MarketBasketProduct mbp ON mp.BasketID = mbp.BasketID   JOIN Product p ON mbp.ProductID = p.ProductID   WHERE       p.ProductName NOT LIKE '%Milk%'   GROUP BY       p.ProductTypeID,       p.ProductName ) SELECT ProductTypeID, ProductName, PurchaseCount FROM OtherProducts ORDER BY PurchaseCount DESC LIMIT 3;"
//     db.query(q,(err, data)=>{
//         if(err) return res.json(err)
//             return res.json(data)
//     })
// })