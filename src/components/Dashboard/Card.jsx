import React from 'react'
import { FaArrowRight } from 'react-icons/fa'


/* Component ng cards na magstore ng deets ng dashboard, pwede sya mareuse */

const Card = ({ title, subTitle, linkText}) => {
  return (
    <div className='flex-1'>
      <div className=' flex flex-col justify-start mt-6 bg-friezOrange-700 p-4 w-11/12 gap-3 text-white rounded-lg shadow-xl'>
        <h1 className='font-bold text-xl uppercase'>{title}</h1>
        <p className='font-bold text-2xl'>{subTitle}</p>
        <a href="#" className='flex items-center gap-3 hover:underline duration-500'>
          {linkText} <FaArrowRight />
        </a>
      </div>
    </div>
  )
}

export default Card