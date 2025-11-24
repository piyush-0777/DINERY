import React from 'react'
import Dinery from '../assets/dinery.png'
import { useForm } from 'react-hook-form'
import Button from '../components/customer/Button'
import {useNavigate} from 'react-router-dom'

const CustomerLogin = () => {
   const navigate = useNavigate();

   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("the data is /n" , data);
     navigate('/customer/customerHome/23')

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

                      <div className='w-full h-10 mt-5'><Button ButtonName="Log in"/></div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default CustomerLogin
