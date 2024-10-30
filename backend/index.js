//create express application
import express from "express"
import mysql from "mysql"

//initialize express
const app = express()

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