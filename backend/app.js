const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoDB_connection = require('./config/mongoDB-connection')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/tables" , require('./'))

app.get('/' , (req , res)=>{
    console.log('express is working....')
})


app.listen(process.env.EXPRESS_PORT , () =>{
    console.log(`app is runing on port ${process.env.EXPRESS_PORT} `);
})