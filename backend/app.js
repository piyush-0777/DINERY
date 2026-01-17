const express = require('express')
const http = require('http')
const cors = require('cors')
require('dotenv').config()
const mongoDB_connection = require('./config/mongoDB-connection')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const {initSocket} = require('./socket/socketServer')

const restaurantRoutes = require('./routes/restaurantRoutes')



const app = express()
const server = http.createServer(app);
const io = initSocket(server)



app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



 app.use("/api/resturant" , require('./routes/restaurantRoutes'))
// app.use("/api/tables" , require('./routes/tableRoutes'))
// app.use("/api/customer" , require('./routes/customerRoutes'))
// app.use("/api/food" , require('./routes/foodRoutes'))
// app.use("/api/order" , require('./routes/orderRoutes'))
// app.use("/api/bill" , require('./routes/billRoutes'))
// app.use("/api/analytics" , require('./routes/analyticsRoutes'))


// app.use(errorMiddleware)




server.listen(process.env.EXPRESS_PORT , () =>{
    console.log(`server + socket.io app is runing on port ${process.env.EXPRESS_PORT} `);
})