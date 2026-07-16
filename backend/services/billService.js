const mongoose = require('../config/mongoDB-connection')
const billModel = require('../models/bill-model')
const tableModel = require('../models/table-model')
const tableService = require('../services/tableService')

const cashBillPayment = async (billId , tableId , restaurant) => {
     const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const bill = await billModel.findById(billId , null , {session});
         bill.paymentStatus = 'paid';
    bill.paymentMode = 'cash';
    await bill.save({session})
    const table = await tableService.updateTableStatus(tableId ,"available")
    const tableData = await tableService.getTableById(tableId , restaurant)
        

        await session.commitTransaction();
        session.endSession()
        return {bill , table:tableData}
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        throw new Error(error)
    }
}

module.exports = { cashBillPayment }
