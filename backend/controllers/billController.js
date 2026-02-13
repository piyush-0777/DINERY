const billModel = require('../models/bill-model')

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
    const bill = await billModel.findById(billId)
    bill.paymentStatus = 'paid';
    bill.paymentMode = 'cash';
    await bill.save()
         res.status(200).json({
      success: true ,
    bill,
   })

    } catch(error) {
      console.log(error);
  return res.status(500).json({error: 'server error 121' })
   }
}