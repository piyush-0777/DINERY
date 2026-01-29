  const tableModel = require('../models/table-model')
  const generateQR = require('../utils/generateQR')
  const crypto = require('crypto')

  exports.createTable = async (req , res) => {
    try{
    const restaurant = req.restaurant
    const {capacity, tableNumber} = req.body
    if(!restaurant) {
        res.status(404).json({
            error: 'restaurant is not found'
        })
    }
    
    const table = await tableModel.create({
        restaurant:restaurant._id ,
        tableId:tableNumber ,
        capacity:capacity ,
        qrCode: crypto.randomUUID()
         })

         const qrImage = await generateQR(table , restaurant.name)
         return res.status(200).json({
            table,
            qrImage
         })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: 'internal server error'
            })
        }
  }