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

  const {  resturantName } = useParams();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


const token = useSelector(state => state.customer.token);
  const foods = useSelector(state => state.foodObject.foods);
  const category = useSelector(state => state.foodObject.category);
  const customer = useSelector(state => state.customer.customer);
  const customerOrder = useSelector(state => state.customer.order)

  const [filterfoods, setFilterFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (!customer) {
      navigate(`/customer/${resturantName}/login/?token=${token}`);
    }
  }, [customer]);

  useEffect(() => {
    dispatch(LoadCustomerDashbord(resturantName));
  }, []);

  useEffect(() => {
    setFilterFoods(foods);
  }, [foods]);

  const changCategory = (e) => {
    const categoryId = e.currentTarget.id;
    setSelectedCategory(categoryId);

    if (categoryId === 'All') {
      setFilterFoods(foods);
    } else {
      setFilterFoods(foods.filter(food => food.category === categoryId));
    }
  };

  // ✅ FIXED ADD ORDER
  const addOrderHandler = (e) => {
    console.log(e)
    const foodId =e;

    const orderFood = foods.find(food => food._id === foodId);
    if (!orderFood) return;

    const isOrder = customerOrder.items.find(
      item => item.food === orderFood._id
    );

    if (isOrder) {
      dispatch(incresContityOfOrder(orderFood._id));
    } else {
      dispatch(addOrder({
        food: orderFood._id,
        name: orderFood.name,
        quantity: 1,
        price: orderFood.price,
        subtotal: orderFood.price,
      }));
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className='flex justify-between items-center bg-[#f6c453] p-2'>
        <img className='w-[50px] rounded-full' src={DineryLogo} />
        <div className='relative w-[60vw]'>
          <input className='w-full px-3 py-1 rounded-2xl' placeholder='search menu' />
          <FaSearch className='absolute right-3 top-2' />
        </div>
      </div>

      {/* CATEGORY */}
      <div className='flex gap-2 overflow-x-auto p-2'>
        {category.map(cat => (
          <ManuCategory
            key={cat._id}
            changCategory={changCategory}
            selectedCategory={selectedCategory}
            CategoryLogo={cat.image}
            CategoryName={cat.name}
            CategoryId={cat._id}
          />
        ))}
      </div>

      {/* FOOD ITEMS */}
      <div className='p-2 flex flex-col gap-2'>
        {filterfoods.map(food => (
          <ManuItem
            key={food._id}
            food={food}
            addOrder={addOrderHandler}
            customerOrder={customerOrder}
          />
        ))}
      </div>

      {/* CART BAR */}
      {customerOrder.items.length > 0 && (
        <CartBar
          order={customerOrder}
          deletAllOrder={() => dispatch(deleteAllOrder())}
        />
      )}
    </div>
  );
};

export default CustomerHome;
