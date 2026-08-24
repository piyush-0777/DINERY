const mongoose = require("../config/mongoDB-connection");
const billRepository = require("../repositories/billRepository");
const tableRepository = require("../repositories/tableRepository");
const tableService = require("./tableService");

class BillService {
  async getBillById(billId) {
    const bill = await billRepository.findById(billId);
    if (!bill) {
      const error = new Error("Bill not found");
      error.statusCode = 404;
      throw error;
    }
    return bill;
  }

  async cashBillPayment(billId, tableId, restaurant) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const bill = await billRepository.findById(billId, session);
      if (!bill) {
        throw new Error("Bill not found");
      }

      const updatedBill = await billRepository.updatePaymentStatus(
        billId,
        "paid",
        "cash",
        session
      );

      // Reset table status to available
      await tableRepository.updateStatus(tableId, "available", null, session);

      await session.commitTransaction();
      session.endSession();

      const tableData = await tableService.getTableById(tableId, restaurant);

      return {
        bill: updatedBill,
        table: tableData,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = new BillService();
