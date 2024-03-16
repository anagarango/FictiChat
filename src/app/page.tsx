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
  const [currentHomeTheme, setCurrentHomeTheme] = useState<string>()
  


  return (
    <main id="main" className="flex w-screen flex-col items-center bg-slate-100">
      <Header currentUserId={currentUserId ?  currentUserId : ""} setCurrentUserId={(e:SessionStorage) => setCurrentUserId(e)} setCurrentHomeTheme={(e:string)=>setCurrentHomeTheme(e)}/>
      <div className='flex flex-col items-center max-w-[900px] p-[20px] justify-around'>
        <div className='flex flex-col items-center pt-24 pb-10'>
          <h1 className='text-4xl font-bold text-center'>Create Immersive Conversations with your Favourite Popular Characters</h1>
          <h4 className='font-bold py-12 text-center'>Dive into captivating conversations as your favourite characters come to life through AI technology. Experience the thrill of personalized interactions and endless possibilities with our innovative chat platform.</h4>
          <button className='bg-[#287B62] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#50A98D]' onClick={()=>{r.push("/characters"); localStorage.setItem("page", "/characters");}}>Try Fictional</button>
        </div>

        <div className='w-full'>
          <Image src={currentHomeTheme == "light" ? "/LightDevice.png" : "/DarkDevice.png"} layout='responsive' quality={100} alt="Devices" width={100} height={100} className="px-3"/>
          <div className={`${currentHomeTheme == "light" ? "bg-white shadow-[-80px_0px_0px_0px_rgb(255,255,255)]" : "bg-slate-900 shadow-[-80px_0px_0px_0px_rgb(15 23 42)]"}bg-white rounded-md w-full h-96 mt-[-300px]`}></div>
        </div>

        <div className='flex pt-60 pb-32 flex-row-reverse'>
          <div className={`w-3/5 rounded-lg ${currentHomeTheme == "light" ? "bg-white shadow-[-80px_0px_0px_0px_rgb(255,255,255)]" : "bg-slate-900 shadow-[-80px_0px_0px_0px_rgb(15 23 42)]"} p-5`}>
            <Image src="/ImmersiveConversationsWhite.png" layout='responsive' quality={100} alt="Devices" width={100} height={100} className="p-5 pr-12" />
          </div>
          <div className='w-2/5 mt-[-90px]'>
            <h3 className='pb-5 font-bold text-lg'>Immersive Conversations</h3>
            <p>Dive deep into conversations with beloved characters such as Homer Simpson, Mario, Batman, and more. Our advanced AI ensures that interactions feel genuine and meaningful.</p>
          </div>
        </div>

          <div className='flex py-32'>
            <div className={`w-3/5 rounded-lg ${currentHomeTheme == "light" ? "bg-white shadow-[80px_0px_0px_0px_rgb(255,255,255)]" : "bg-slate-900 shadow-[-80px_0px_0px_0px_rgb(15 23 42)]"}`}>
              <Image src={currentHomeTheme == "light" ? "/DeepInsightsLight.png" : "/DeepInsightsDark.png"} layout='responsive' quality={100} alt="Devices" width={100} height={100} className="p-7 pr-12" />
            </div>
            <div className='w-2/5 mt-[-90px]'>
              <h3 className='pb-5 font-bold text-lg text-right'>Deep Insights</h3>
              <p className='text-right'>Gain unique perspectives and insights from characters with diverse backgrounds and expertise. Whether it's discussing technology with Nikola Tesla or about crossing the Atlantic Ocean with Amelia Earhart, you'll expand your knowledge in fascinating ways.</p>
            </div>
          </div>

          <div className='flex py-32 flex-row-reverse'>
            <div className={`w-3/5 rounded-lg ${currentHomeTheme == "light" ? "bg-white shadow-[-80px_0px_0px_0px_rgb(255,255,255)]" : "bg-slate-900 shadow-[-80px_0px_0px_0px_rgb(15 23 42)]"} p-4`}>
              <Image src={currentHomeTheme == "light" ? "/ConstantUpdatesWhite.png" : "/ConstantUpdatesDark.png"} layout='responsive' quality={100} alt="Devices" width={100} height={100} className="p-5 pr-12" />
            </div>
          <div className='w-2/5 mt-[-90px]'>
            <h3 className='pb-5 font-bold text-lg'>Constant Updates</h3>
            <p>If you have any new character suggestions through them through the feedback form, there's always something fresh to discover. Expand your roster of conversational companions and unlock even more exciting dialogue options.</p>
          </div>
        </div>

        <div className='flex py-32'>
          <div className={`w-3/5 rounded-lg ${currentHomeTheme == "light" ? "bg-white shadow-[80px_0px_0px_0px_rgb(255,255,255)]" : "bg-slate-900 shadow-[-80px_0px_0px_0px_rgb(15 23 42)]"}`}>
            <Image src={currentHomeTheme == "light" ? "/SafeAndSecureWhite.png" : "/SafeAndSecureDark.png"} layout='responsive' quality={100} alt="Devices" width={100} height={100} className="p-4 pr-12" />
          </div>
          <div className='w-2/5 mt-[-90px]'>
            <h3 className='pb-5 font-bold text-lg text-right'>Safe and Secure</h3>
            <p className='text-right'>Rest assured that your conversations are private and secure. We prioritize user privacy and data protection to ensure a worry-free experience.</p>
          </div>
        </div>

        </div>
        <footer className={`${currentHomeTheme == "light" ? "bg-white" : "bg-slate-900"} p-4 w-full flex justify-between`}>
          <Image alt="fictichat logo" width={100} height={100} className='w-24' src="/fictichat.svg"/>
          <div className='flex gap-2'>
            <a href="https://www.linkedin.com/in/anagarango/" target="_blank">
              <Image alt="linkedin logo" width={100} height={100} className='w-6' src="/linkedin.png"/>
            </a>
            <a href="https://github.com/anagarango" target="_blank">
              <Image alt="github logo" width={100} height={100} className='w-6' src="/github.png"/>
            </a>
          </div>
        </footer>
    </main>
  )
}
