const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoDB_connection = require('./config/mongoDB-connection')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')



const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/resturant" , require('./routes/restaurantRoutes'))
app.use("/api/tables" , require('./routes/tableRoutes'))
app.use("/api/customer" , require('./routes/customerRoutes'))
app.use("/api/food" , require('./routes/foodRoutes'))
app.use("/api/order" , require('./routes/orderRoutes'))
app.use("/api/bill" , require('./routes/billRoutes'))
app.use("/api/analytics" , require('./routes/analyticsRoutes'))


app.use(errorMiddleware)




app.listen(process.env.EXPRESS_PORT , () =>{
    console.log(`app is runing on port ${process.env.EXPRESS_PORT} `);
})