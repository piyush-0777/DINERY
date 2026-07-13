const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
console.log(`${url}/dinerydata`)

mongoose.connect(`${url}/dinerydata`)
.then(()=>{
    console.log('mongoDB is connected....')
    console.log(mongoose.connection.name);
})
.catch((e)=>{
    console.log('mongoDB connection error' , e)
})

module.exports = mongoose.connection;