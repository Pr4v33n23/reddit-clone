import React from 'react'
import Image from 'next/image'
import logomini from '../public/Reddit-logo-mini.png'

const SignIn = () => {
  return (
    <div className="curson-pointer hidden items-center space-x-2 border border-gray-100 p-2 lg:flex">
      <div className="relative h-5 w-5 flex-shrink-0">
        <Image src={logomini} objectFit="contain" layout="fill" alt="" />
      </div>
      <p className="text-gray-500">Sign In</p>
    </div>
  )
}

export default SignIn
