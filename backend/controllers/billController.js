const billModel = require('../models/bill-model')
const billService = require('../services/billService')

exports.getBillById = async(req , res) => {
    try {
    const billId = req.params.billId;
    const bill = await billModel.findById(billId)
     res.status(200).json({
      success: true ,
    bill,
   })
   } catch(error) {
      console.log(error);
  return res.status(500).json({error: 'server error 121' })
   }
}

exports.BillCashPayment = async (req , res) => {
    try {
    const billId = req.params.billId;
    const tableId = req.params.tableId;

    const {bill , table} = await billService(billId , tableId)

    res.status(200).json({
      message:'payment is seccessfuly payed',
      secces: true,
      data:{bill , table}
    })

    } catch(error) {
      console.log(error);
  return res.status(500).json({error: 'server error 121' })
   }
}