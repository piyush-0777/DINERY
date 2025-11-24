import React, { useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import CustomerLogin from './CustomerLogin'
import CustomerHome from './CustomerHome'
import CustomerBill from './CustomerBill'
const Table = () => {
    const [tables , setTables] = useState([])
  return (
   <div>
    
      <Routes>
        <Route path='/login/:id' element={ <CustomerLogin/>} />
        <Route path='customerHome/:id' element={ <CustomerHome/>} />
        <Route path='customerBill/:id' element={ <CustomerBill/>} />
      </Routes>
      
   </div>

   
  )
}

export default Table
