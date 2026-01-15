import React from 'react'
import Dinery from '../assets/dinery.png'
import { useForm } from 'react-hook-form'
import Button from '../components/customer/Button'
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { addCustomer } from '../features/customer/customerSlice'
import { toast } from 'react-toastify'

const CustomerLogin = () => {

  const dispatch = useDispatch();

   const navigate = useNavigate();
   const {id} = useParams()

   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    if(data.number.toString().length != 10) {
    toast.error('enter valid number');
      console.log(data.number.toString());
    } else {
    console.log("the data is /n" , data);
    dispatch(addCustomer({customerName:data.name ,CustomerMobile:data.number}))
     navigate(`/customer/customerHome/${id}`)
     toast.success("login success!")
    }
  }

  
  return (
    <div>
        {/* aa logo and restorant name mate  */}
        <div className='w-[100%] flex flex-col items-center gap-3'>
           
            <div 
            className=' w-[60%] pt-2 '
            >
                    <img className=' rounded-full' src={Dinery} alt="this is image logo" />
            </div>
            <div className='flex flex-col gap-2 items-center w-[60%]'>
                <div className='text-xl'>Walcome to</div>
                <div className='text-4xl text-[#f6c453] font-bold'>dinery</div>

            </div>
            {/* form for customerd  */}
             <div className='w-[100%]'>
                <form className='flex  flex-col gap-2 w-[90%]  items-start ml-4 ' onSubmit={handleSubmit(onSubmit)}>
                  <label >Name</label>

                  
                    <input className=' bg-gray-300 focus:border-none
                     focus:outline-none w-full h-10 rounded-2xl p-2'

                     placeholder='Enter Your Name'

                    {...register("name" ,{
                      required: true 
                    })} />
                    <label >Mobile</label>


                    <input  className=' bg-gray-300 focus:border-none
                    focus:outline-none w-full h-10 rounded-2xl p-2'
                    placeholder='Enter Your Mobile Number'
                    type='number' {...register("number", { required: true })} />

                      <div  className='w-full h-10 mt-5'><Button ButtonName="Log in"/></div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default CustomerLogin
