const tableModel = require('../models/table-model')
const generateQR = require('../utils/generateQR')
const crypto = require('crypto')

exports.getAllTable = async (req, res) => {
    try {
        const restaurant = req.restaurant
        if (!restaurant) {
            res.status(404).json({
                error: 'restaurant is not found'
            })
        }

        const tables = await tableModel.find({ restaurant: restaurant._id })
        let tablesWithQrimage = [];
        for (let table of tables) {
            const qrImage = await generateQR(table, restaurant.name)
            tablesWithQrimage.push({ ...tables, qrImage: qrImage })
        }
        return res.status(200).json({
            tables: tablesWithQrimage
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'internal server error'
        })
    }
}

exports.createTable = async (req, res) => {
    try {
        const restaurant = req.restaurant
        const { capacity, tableNumber } = req.body
        if (!restaurant) {
            res.status(404).json({
                error: 'restaurant is not found'
            })
        }

        const table = await tableModel.create({
            restaurant: restaurant._id,
            tableId: tableNumber,
            capacity: capacity,
            qrCode: crypto.randomUUID()
        })

        const qrImage = await generateQR(table, restaurant.name)
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

exports.deleteTable = async (req, res) => {
    try {
        const restaurant = req.restaurant

        const tableId = req.params.tableId;
        if (!restaurant) {
            res.status(404).json({
                error: 'restaurant is not found'
            })
        }
        const table = tableModel.findOne(tableId)
        if (!table) {
            res.status(404).json({
                error: 'table is not found'
            })
        }
        if (table.status !== "available") {
            return res.status(400).json({
                error: 'table cannot be deleted while occupied or reserved',
            })
        }
        await table.deleteOne();
        return res.status(200).json({
            message: 'table is deleted..',
            table
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'internal server error'
        })
    }

}

exports.updateStatus = async (req, res) => {
    try {
        const restaurant = req.restaurant
        const { status } = req.body
        if (!restaurant) {
            return res.status(404).json({
                error: 'restaurant is not found'
            })
        }
        const tableId = req.params.tableId;
        if (!table) {
            return res.status(404).json({
                error: 'table is not found'
            })
        }
        const table = tableModel.findOne(tableId)
        if (!table) {
            return res.status(404).json({
                error: 'table is not found'
            })
        }
        table.status = status;
        await table.save()
        return res.status(200).json({
            message: 'table status is updated.',
            table
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'internal server error'
        })
    }
}