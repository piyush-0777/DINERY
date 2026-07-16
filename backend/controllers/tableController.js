const tableModel = require('../models/table-model')
const generateQR = require('../utils/generateQR')
const crypto = require('crypto')
const tableService = require('../services/tableService')

exports.getAllTable = async (req, res) => {
   try {
        const tables = await tableService.getAllTable(req.restaurant);

        return res.status(200).json({
            tables,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message,
        });
    }
};

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

        const qrImage = await generateQR(table, restaurant.restaurantName)
       const data = {...table._doc, qrImage:qrImage}
        return res.status(200).json({
            message:'table is added',
            table:data
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
        const table = await tableModel.findById(tableId)
        if (!table) {
            res.status(404).json({
                error: 'table is not found'
            })
        }
        console.log(table)
        if (table.status != "available") {
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
        const restaurant = req.restaurant;
        const { status , customer } = req.body;
        const { tableId } = req.params;
        

        if (!restaurant) {
            return res.status(404).json({
                error: "Restaurant not found",
            });
        }

        const table = await tableService.updateTableStatus(
            tableId,
            status ,
            customer
        );
        const tableData = await tableService.getTableById(tableId , restaurant)

        return res.status(200).json({
            message: "Table status updated successfully.",
            table:tableData,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.getTableById = async (req , res) => {
    try {
        const restaurant = req.restaurant;
         const tableId = req.params.tableId;
         const table = await tableService.getTableById(tableId , restaurant)

         return res.status(200).json({
            secess: true,
            table
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'internal server error'
        })
    }
}