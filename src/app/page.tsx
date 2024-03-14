"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from './components/Header'

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Home() {
  const r = useRouter()

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const storedData = sessionStorage.getItem("currentUser");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCurrentUserId(parsedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchChatData();
  }, []);

  const [currentUserId, setCurrentUserId] = useState<SessionStorage | null>(null);
  


  return (
    <main id="main" className="flex h-screen max-h-screen w-screen flex-col items-center bg-slate-100">
      <Header currentUserId={currentUserId ?  currentUserId : ""} setCurrentUserId={(e:SessionStorage) => setCurrentUserId(e)}/>
      <h1>Chat with you Favourite Characters!</h1>
    </main>
  )
}
