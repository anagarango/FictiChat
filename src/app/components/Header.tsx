import { useRouter } from "next/navigation"
import Image from 'next/image'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Header({setViewModal, currentUserId=null}:{setViewModal:Function, currentUserId:SessionStorage | any}){
  const r = useRouter()

  const { resolvedTheme, setTheme } = useTheme()
  const [switchTheme, setSwitchTheme] = useState<string | undefined>("")

  useEffect(() => {
    setSwitchTheme(resolvedTheme)
  }, [resolvedTheme])

  const toggleTheme = () => {
    if(switchTheme == "light"){
      setSwitchTheme("dark")
      setTheme("dark")
    } else {
      setSwitchTheme("light")
      setTheme("light")
    }
  }

  const logOut = () => {
    sessionStorage.removeItem(String(currentUserId?.id))
    window.location.reload();
  }


  return(
    <div id="header" className='bg-white p-3 flex w-full justify-between items-center'>
      <Image alt="fictichat logo" width={100} height={100} onClick={()=>r.push("/")} className='w-32 cursor-pointer' src="/fictichat.svg"/>
      <div className='flex gap-4 items-center'>
        <button className='cursor-pointer duration-200 hover:text-[#50A98D]' onClick={()=>{setViewModal("feedback")}}>Feedback</button>
        <Image alt={switchTheme || "icon"} onClick={()=>{toggleTheme()}} src={switchTheme == "light" ? "/dark.png" : "/light.png"} width={10} height={10} className="flex w-auto h-[25px] cursor-pointer"/>
        <button className='bg-[#287B62] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#50A98D]' onClick={()=>{currentUserId ? logOut() : setViewModal("login")}}>{currentUserId ? "Sign Out": "Sign In"}</button>
      </div>
    </div>
  )
}