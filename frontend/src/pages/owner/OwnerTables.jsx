import { useSelector , useDispatch} from "react-redux";
import { useState } from "react";
import {useCashPayment} from '../../features/bill'
import {
  TableCard ,
  TableDetailsModal ,
  QRPopup ,
  AddTableModal ,
  useAddTable ,

} from '../../features/table'
import {OrderDetailModal} from '../../features/order'
import { toast } from "react-toastify";


export default function TablesPage() {

  const dispatch = useDispatch() 
  const addTable = useAddTable()
  const cashPayment = useCashPayment()

  const tables = useSelector(state => state.tables.tables);
  const loardTable = useSelector(state => state.loardtables)
  const bills = useSelector(s=> s.bills.bill)
  const { list } = useSelector(s => s.orders)
  

  const [selectedTable, setSelectedTable] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder , setSelectedOrder] = useState();


  const handleAddTable = async (data) => {
    
    try {
      const result = await addTable.addTable(data);
      setShowAddModal(false)
      toast.success('table is added')
    } catch (error) {
      toast.error(error.message || 'faild to add table')
    }
  }


  const handleCashPayment = async(billId , tableId , customerId) => {
    try{
      const result = await cashPayment.cashPayment({billId , tableId , customerId})
      toast.success('payment done')
    } catch(error) {
      toast.error(error.message || 'payment faild')

    }
  
  }

  const setOrderBillDeteal = (id) =>{
    list.map((e)=> {
      if(e._id == id){
        setSelectedOrder(e);
      }
    })
  }


  return (
    <div className="p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Tables</h1>

        <div className="flex gap-3">
          {/* Add Table */}
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-full backdrop-blur-md border
              bg-black/70 border-yellow-400/40 text-yellow-400
              hover:border-yellow-500 hover:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Add Table
          </button>

          
        </div>
      </div>
      {/* Table Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {tables.map(table => (
          <TableCard
            key={table.id}
            table={table}
            onOpen={() => setSelectedTable(table)}
            onShowQR={() => setQrImage(table.qrImage)}
            onBill={setOrderBillDeteal}
          />
        ))}
      </div>

      {/* 🔳 Modals */}
      <TableDetailsModal
        table={selectedTable}
        onClose={() => setSelectedTable(null)}
      />

      <QRPopup
        qr={qrImage}
        onClose={() => setQrImage(null)}
      />


      {showAddModal && (
  <AddTableModal
    onAdd={handleAddTable}
    loading ={addTable.loading}
    onClose={() => setShowAddModal(false)}
  />
)}

{selectedOrder && 
<OrderDetailModal  
order={selectedOrder} 
bill = {
     bills.filter((e)=> e.order === selectedOrder._id)[0]
}
onClose={()=>{setSelectedOrder(null)}}
onCashPayment={handleCashPayment} 
loading={cashPayment.loading}
/>}
    </div>
  );
}
