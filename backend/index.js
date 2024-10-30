import express from "express"
import mysql from "mysql"

//initialize express
const app = express()

app.listen(8800, ()=>{
    console.log("You have launched the backend successfully ")
})