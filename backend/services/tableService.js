const tableModel = require('../models/table-model')

const getTableById = async(tableId) =>{
    try {
        const table = await tableModel.findById(tableId)
        return table;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {getTableById}