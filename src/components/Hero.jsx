import React from 'react'
import { assets } from '../assets/assets.js'

export default function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 mt-5'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>BEST LEATHER SHOP IN TOWN</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Handmade Leather <br/> Bags & Jackets</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        <div className="w-full sm:w-1/2 h-64 sm:h-80 md:h-[500px] overflow-hidden">
            <img src={assets.hero_img2} className='w-full h-full object-cover object-top' alt="Hero Image" />
        </div>
    </div>
  )
}

