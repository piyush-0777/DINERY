import './App.css'
import Button from './components/customer/Button'
import CustomerLogin from './customer/CustomerLogin'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Table from './customer/Table'


function App() {
  
  return (
   <Router>
   <div>
    
      <Routes>
        <Route path='/customer/*' element={ <Table/>} />
   
      </Routes>
    
      
  
   </div>
  </Router>
  )
}

export default App
