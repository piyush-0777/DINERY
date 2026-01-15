import './App.css'
import Button from './components/customer/Button'
import CustomerLogin from './customer/CustomerLogin'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Table from './customer/Table'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
   <Router>
   <div>
    <ToastContainer 
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover={false}
    theme="colored"/>
      <Routes>
        <Route path='/customer/*' element={ <Table/>} />
        
      </Routes>
    
      
  
   </div>
  </Router>
  )
}

export default App
