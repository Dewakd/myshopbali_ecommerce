import React from 'react'
import { assets } from '../assets/assets'

export default function Footer() {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <h2 className='text-3xl font-semibold mb-5'>LAVANYA LEATHER</h2>
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At tenetur distinctio vel tempore dolores? Rerum, sapiente provident molestias sunt, fugit explicabo, nemo reprehenderit voluptate aliquam quam itaque doloremque earum repudiandae?
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+62899065344</li>
                    <li>dewakd22@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ myshopbali.com - All Right Reserved</p>
        </div>
    </div>
  )
}
