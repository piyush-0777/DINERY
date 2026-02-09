import React, { use, useEffect } from 'react'
// import Dinery from '../../assets/dinery.png'
import Dinery from '../../assets/dinery.png'
import { useForm } from 'react-hook-form'
import Button from '../../components/customer/Button'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import { addCustomer } from '../features/customer/customerSlice'
import { addCustomer, addToken } from '../../redux/features/customer/customerSlice'
import { resetloadCustomerState } from '../../redux/features/customer/loadCustomerSlice'
import { customerLoginThunk } from '../../redux/thunks/customerThunk'
import { toast } from 'react-toastify'

const CustomerLogin = () => {

  // use to change and save new data in redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resturantName } = useParams()
  const loadCustomer = useSelector(state => state.loadcustomer)
  console.log(loadCustomer)

  const customerDeteal = useSelector(state => state.customer)


  useEffect(() => {
    if (loadCustomer.success === true) {
      navigate(`/customer/${resturantName}/customerHome`)
      toast.success("login success!")
      dispatch(resetloadCustomerState())
    }
    if (loadCustomer.error) {
      console.log(loadCustomer.error);
      toast.error(loadCustomer.error.message)
      dispatch(resetloadCustomerState())
    }
  }, [loadCustomer.success, loadCustomer.error])

  //for get search params
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    dispatch(addToken(token))
    localStorage.setItem("token", token);
  }, [])

  // use to navigate user to other paje


  // use to get table id


  // form data struct
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // submit customer data
  const onSubmit = async (data) => {
   
      dispatch(customerLoginThunk({ resturantName: resturantName, customerName: data.name, CustomerMobile: data.number }))

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

              {...register("name", {
                required: true
              })} />
            <label >Mobile</label>


            <input className=' bg-gray-300 focus:border-none
                    focus:outline-none w-full h-10 rounded-2xl p-2'
              placeholder='Enter Your Mobile Number'
              type='number' {...register("number", {
                required: true,
                minLength: 10,
                maxLength: 10
              })} />

            <div className='w-full h-10 mt-5'><Button
              ButtonName={loadCustomer.loading === true ? 'loding...' : 'Log in'} /></div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CustomerLogin
