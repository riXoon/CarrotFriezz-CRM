import React from 'react'
import { FaArrowRight } from 'react-icons/fa'


/* Component ng cards na magstore ng deets ng dashboard, pwede sya mareuse */

const Card = ({ title, subTitle, linkText, showlinkText = true}) => {
  return (
    <div className='flex-1'>
      <div className=' flex flex-col justify-start mt-6 bg-friezOrange-700 p-4 w-11/12 gap-4 text-white rounded-lg shadow-xl pb-16'>
        <h1 className='font-bold text-xl uppercase'>{title}</h1>
        
        <div className='flex gap-10'>

          <p className='font-bold text-2xl'>{subTitle}</p>

          {showlinkText &&
          (<a href="#" className='flex items-center gap-3 hover:underline duration-500 relative top-12 right-[7.4rem]'>
            {linkText} <FaArrowRight />
          </a>)
          }
        </div>
      </div>
    </div>
  )
}

export default Card