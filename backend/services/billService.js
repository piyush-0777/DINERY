const mongoose = require('../config/mongoDB-connection')
const billModel = require('../models/bill-model')
const tableModel = require('../models/table-model')

const cashBillPayment = async (billId , tableId) => {
     const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const bill = await billModel.findById(billId , null , {session});
         bill.paymentStatus = 'paid';
    bill.paymentMode = 'cash';
    await bill.save({session})
    const table = await tableModel.findById(tableId , null , {session});
        table.status = 'available'
        await table.save({session});

        await session.commitTransaction();
        session.endSession()
        return {bill , table}
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        throw new Error(error)
    }
}

module.exports = { cashBillPayment }
