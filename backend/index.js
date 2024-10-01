import express from "express"
import mysql from "mysql"

const app = express()
//var mysql = require('mysql');

const dbms = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"metromart"
})

app.get("/", (req, res)=>{
    res.json("hello this is me the backend dev")
})

app.get("/product", (req, res)=> {
    const q = "SELECT*FROM product"
    dbms.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Backend connection established.")
})