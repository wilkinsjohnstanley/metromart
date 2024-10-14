import express from "express"
import mysql from "mysql"
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());
//var mysql = require('mysql');

const dbms = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"metromart"
})

app.get("/", (req, res)=>{
    res.json("hello this is me the backend dev")
});

app.get("/product", (req, res)=> {
    const q = "SELECT*FROM product";
    dbms.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
});
app.post("/product", (req, res) => {
    const q = "INSERT INTO product(`ProductID`, `ProductName`, `UPC`, `Size`, `Price`, `ProductTypeID`, `BrandID`) VALUES (?)";
  
    const values = [
      req.body.ProductID,
      req.body.ProductName,
      req.body.UPC,
      req.body.Size,
      req.body.Price,
      req.body.ProductTypeID,
      req.body.BrandID,
     
    ];
    dbms.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json("Product has been added successfully.");
      });
    });   

app.delete("/product/:ProductID", (req, res)=>{
    const id = req.params.ProductID;
    const q = "DELETE FROM PRODUCT WHERE ProductID = ?"
    dbms.query(q,[id], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Product has been deleted successfully.");
    });
});

app.put("/product/:ProductID", (req, res)=>{
    const id = req.params.ProductID;
    const q = "UPDATE PRODUCT SET `ProductID` = ?, `ProductName` = ?, `UPC` = ?, `Size` = ?, `Price` = ?, `ProductTypeID` = ?, `BrandID` = ? WHERE ProductID = ?"
    
    const values = [
        req.body.ProductID,
        req.body.ProductName,
        req.body.UPC,
        req.body.Size,
        req.body.Price,
        req.body.ProductTypeID,
        req.body.BrandID,
       
      ];
    
    dbms.query(q,[...values, id], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Product has been updated successfully.");
    });
});

app.listen(8800, ()=>{
    console.log("Backend connection established.")
})