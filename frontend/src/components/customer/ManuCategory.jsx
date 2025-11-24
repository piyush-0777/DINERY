import React from 'react'

const ManuCategory = ({changCategory ,selectedCategory ,CategoryLogo , CategoryName }) => {

  
  

  return (
    // <div className='flex flex-col w-[80px] h-[90px] bg-[#e1eedd] py-0.5 rounded-lg border-[1px] border-gray-300 items-center flex-shrink-0 snap-start'>
    //               <img className='w-[60px] rounded-full' src={CategoryLogo} alt="this is a image" />
    //               <span className='text-gray-400'>{CategoryName}</span>
    //             </div>


     <div 
        id={CategoryName}
          className={`
            flex flex-col items-center rounded-xl p-4 shadow-md w-[150px] hover:scale-105 transition-transform 
            ${selectedCategory==CategoryName? 'bg-[#e2eedd]':'bg-white'}`}
            onClick={changCategory}
     >
      {/* Yellow circular image */}
      <img
       id={CategoryName}
        src={CategoryLogo} // replace with your yellow image link
        alt="Dinery Feast"
        className="w-[50px] h-[50px] rounded-full object-cover"
      />

      {/* Text below */}
      <span  id={CategoryName} className="text-gray-600 text-sm w-[100px] text-center font-medium mt-2">{CategoryName}</span>
    </div>
  )
}

export default ManuCategory
