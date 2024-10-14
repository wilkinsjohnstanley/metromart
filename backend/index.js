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
      req.body.productname,
      req.body.size,
      req.body.price,
     
    ];
    dbms.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    });   

app.listen(8800, ()=>{
    console.log("Backend connection established.")
})