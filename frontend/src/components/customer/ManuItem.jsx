import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch} from 'react-redux';
import { dicresContityOfOrder } from '../../features/customer/customerSlice';

const ManuItem = ({food , placeOrder , customerOrder  }) => {

  const dispatch = useDispatch()

const [isFoodOrder , setIsfoodOrder] = useState(false);


useEffect(()=>{
customerOrder.map((order)=>{
  if(order.f_name == food?.f_name ) {
    setIsfoodOrder(true);
  } else {
    setIsfoodOrder(false);
  }
})
},[customerOrder])

const hendalDicresContity = (e) => {
     setContityOforder(contityOforder -1)
     dispatch(dicresContityOfOrder({id:1 , f_name:food.f_name }));
     console.log(e);
   }


const [contityOforder , setContityOforder] = useState(()=>{
  if(isFoodOrder == true) return customerOrder.number_of_item
  else return 0;
});



  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      {/* Title Section */}
     

      {/* Food Item Section */}
      <div className="flex justify-between items-start">
        {/* Left side */}
        <div className="flex flex-col justify-start w-1/2">
          {/* Veg/Non-Veg indicator */}
          <div className="w-5 h-5 border-2 border-green-600 rounded-sm flex justify-center items-center mb-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>

          {/* Food Name */}
          <h3 className="text-gray-900 font-semibold leading-tight">
            {food?.f_name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            {/* <span className="w-16 bg-green-200 h-2 rounded-md">
              <span className="block bg-green-700 w-2/3 h-2 rounded-md"></span>
            </span> */}
            {food?.f_about}
          </p>

          {/* Price */}
          <p className="text-gray-800 font-semibold mt-2">₹{food?.f_price}</p>

          {/* Action Icons */}
          <div className="flex gap-3 mt-3">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>

            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12v.01M12 12v.01M20 12v.01M4 6h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side - Image and Add button */}
        <div className="relative">
          <img
            src={food?.f_img}
            alt="Pizza"
            className="w-32 h-32 rounded-xl object-cover"
          />

          {/* Add Button */}
          <button
          id={food?.f_name}
          onClick={placeOrder}
           className={`absolute -bottom-5 right-2 
            ${contityOforder!==0 ? 'bg-green-800 text-white':'bg-green-50 border text-green-800'}
            border-green-600  font-bold text-sm px-6 py-1.5 
            rounded-lg flex items-center gap-1 shadow-sm hover:bg-green-100 transition`}>
              {contityOforder !=0 ? <span onClick={hendalDicresContity} id={food?.f_name} className="text-lg font-bold">-</span>:''}
              
            {contityOforder==0 ? 'ADD' :`${contityOforder}`} 
            <span onClick={()=>setContityOforder(contityOforder +1)} id={food?.f_name} className="text-lg font-bold">+</span>
          </button>
        </div>
      </div>
      

      {/* Customisable Text */}
      <p className="text-gray-400 text-sm mt-8 ml-auto text-right">
        customisable
      </p>
    </div>
  )
}

export default ManuItem
