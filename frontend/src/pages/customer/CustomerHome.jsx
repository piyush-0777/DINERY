import DineryLogo from '../../assets/dinery.png'
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';
import ManuCategory from '../../components/customer/ManuCategory';
import ManuItem from '../../components/customer/ManuItem'
import CartBar from '../../components/customer/CartBar';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, deleteAllOrder, incresContityOfOrder } from '../../redux/features/customer/customerSlice'
import { useNavigate, useParams } from 'react-router-dom';
import { LoadCustomerDashbord } from '../../redux/thunks/customerThunk'



const CustomerHome = () => {

  const { id } = useParams();


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { resturantName } = useParams()
  const foods = useSelector(state => state.foodObject.foods)



  const category = useSelector(state => state.foodObject.category)
  const customer = useSelector(state => state.customer.customer)
  console.log(useSelector(state => state.customer));

  const [filterfoods, setfilerFoods] = useState(useSelector(state => state.foodObject.foods))
  const [selectedCategory, setSelectedCategory] = useState('All');





  useEffect(() => {
    if (customer.customerName === '' || customer.CustomerMobile === '') {
      navigate(`/customer/login/${id}`)
    }
  }, [])

  useEffect(() => {
    dispatch(LoadCustomerDashbord(resturantName))
  }, [])




  const changCategory = element => {

    setSelectedCategory(element.target.id)
    if (element.target.id != 'All') {
      
      setfilerFoods(foods.filter((food) => food.category == element.target.id));
   
    } else {
      setfilerFoods(foods);
    }
  }

  // add user order and save to redux customer order store 
  const placeOrder = element => {

    const orderFood = foods.filter((food) => food.name === element.target.id)[0]
    const isOrder = customer.order.items.find((item) => orderFood._id == item.id)


    if (isOrder) {

      // if order is already added then incres the contity of order

      dispatch(incresContityOfOrder(orderFood._id))
    } else {

      // else add order
      dispatch(addOrder({ food:orderFood._id, name: orderFood.name, quantity: 1, price: orderFood.price , subtotal:orderFood.price }))
    }

  }




  // for  delete all order 
  const deletAllOrderFunction = element => {

    dispatch(deleteAllOrder())
  }





  return (
    <div >

      {/* header section */}
      <div className='flex flex-row justify-between items-center pb-6  bg-[#f6c453] px-1'>
        <img className='w-[50px]  rounded-full' src={DineryLogo} alt="hello" />
        <div className='flex relative w-[60vw] h-8 '>
          <input className='focus:border-none w-full h-full px-2
                     focus:outline-none bg-[#e2eedd]  rounded-2xl' type="text" placeholder='search manu' />
          <FaSearch className=' text-[#f0a04b] absolute top-[25%] right-2' />

        </div>
      </div>

      {/* category filter contaion */}

      <div>
        <div className='p-1 px-2 text-lg font-semibold text-gray-900 mb-3'>
          <p>what's on your mind?</p>
        </div>
        <div className=' p-1 px-2 flex gap-2 items-center overflow-x-auto w-screen h-[120px]  scroll-smooth snap-x snap-mandatory '>
          {category && category.map(item => {
            return <ManuCategory
              changCategory={changCategory}
              selectedCategory={selectedCategory}
              CategoryLogo={item?.image}
              CategoryName={item?.name}
              CategoryId={item?._id} />
          })}


        </div>
      </div>

      {/* food items */}

      <div>
        <h2 className="p-1 px-2  text-lg font-semibold text-gray-900 mb-3">
          Recommended for you
        </h2>
        <div className=' p-1 px-2 flex flex-col gap-1  scroll-smooth snap-y snap-mandatory'>
          {filterfoods.map(food => {
            return <ManuItem
              customerOrder={customer.order}
              placeOrder={placeOrder}
              food={food} />
          })}




        </div>
      </div>


      {/* footer  */}
      {
        customer.order.length != 0 ? (
          <div>

            <CartBar order={customer.order} deletAllOrder={deletAllOrderFunction} />
          </div>
        ) : (<div></div>)
      }

    </div>
  )
}

export default CustomerHome