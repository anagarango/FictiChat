"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from './components/Header'
import Image from 'next/image'

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Home() {
  const r = useRouter()
  const [currentUserId, setCurrentUserId] = useState<SessionStorage | null>(null);
  


  return (
    <main id="main" className="flex w-screen flex-col items-center bg-slate-100">
      <Header currentUserId={currentUserId ?  currentUserId : ""} setCurrentUserId={(e:SessionStorage) => setCurrentUserId(e)}/>
      <div className='flex flex-col items-center max-w-[900px] p-[20px] justify-around'>
        <div className='flex flex-col items-center pt-24 pb-10'>
          <h1 className='text-4xl font-bold text-center'>Create Immersive Conversations with your Favourite Popular Characters</h1>
          <h4 className='font-bold py-12 text-center'>Dive into captivating conversations as your favourite characters come to life through AI technology. Experience the thrill of personalized interactions and endless possibilities with our innovative chat platform.</h4>
          <button className='bg-[#287B62] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#50A98D]' onClick={()=>{r.push("/characters"); localStorage.setItem("page", "/characters");}}>Try Fictional</button>
        </div>
        <div className='w-full'>
          <Image src="/White Device.png" layout='responsive' quality={100} alt="Devices" width={100} height={100} className="px-3"/>
          <div className='bg-white rounded-md w-full h-96 mt-[-300px]'></div>
        </div>
        <div className='py-48'>
          <div className='flex py-24'>
            <div className='w-2/4'>
              <h3 className='pb-5 font-bold text-lg'>Immersive Conversations</h3>
              <p>Dive deep into conversations with beloved characters such as Homer Simpson, Mario, Batman, and more. Our advanced AI ensures that interactions feel genuine and meaningful</p>
            </div>
            <div className='w-2/4'>
              <Image src="/White Device.png" layout='responsive' quality={100} alt="Devices" width={100} height={100} className="px-3"/>
            </div>
          </div>
          <div className='flex py-24'>
            <div className='w-2/4'>
              <Image src="/White Device.png" layout='responsive' quality={100} alt="Devices" width={100} height={100} className="px-3"/>
            </div>
            <div className='w-2/4'>
              <h3 className='pb-5 font-bold text-lg'>Immersive Conversations</h3>
              <p>Dive deep into conversations with beloved characters such as Homer Simpson, Mario, Batman, and more. Our advanced AI ensures that interactions feel genuine and meaningful</p>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  )
}
