const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(`${url}/dinerydata`)
.then(()=>{
    console.log('mongoDB is connected....')
})
.catch((e)=>{
    console.log('mongoDB connection error' , e)
})

module.exports = mongoose.connection;