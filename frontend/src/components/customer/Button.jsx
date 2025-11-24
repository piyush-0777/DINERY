import React from 'react'

const Button = ({ ButtonName}) => {
  return (
    <div className='w-[100%] flex  justify-center items-center h-[100%] bg-[#f6c453]
                     rounded-2xl
    '>
      <button  className=' text-2xl text-[#e1eedd]'>{ButtonName}</button>
    </div>
  )
}

export default Button
