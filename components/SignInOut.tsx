import React, { useEffect } from 'react'
import Image from 'next/image'
import logomini from '../public/Reddit-logo-mini.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Router, useRouter } from 'next/router'

const SignInOut = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src={logomini} objectFit="contain" layout="fill" alt="" />
          </div>
          <p className="truncate text-gray-500">{session.user?.name}</p>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src={logomini} objectFit="contain" layout="fill" alt="" />
          </div>
          <p className="text-gray-500">Sign In</p>
        </div>
      )}
    </>
  )
}

export default SignInOut
