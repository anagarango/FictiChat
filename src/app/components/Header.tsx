import { useRouter, usePathname } from "next/navigation"
import Image from 'next/image'
import FeedbackForm from "./FeedbackForm"
import LogIn from "./LogIn"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Header({currentUserId, setCurrentUserId=()=>{}, setCurrentHomeTheme}:{currentUserId:SessionStorage | string, setCurrentUserId:Function, setCurrentHomeTheme?:Function}){
  const r = useRouter()
  const p = usePathname()

  const { resolvedTheme, setTheme } = useTheme()
  const [switchTheme, setSwitchTheme] = useState<string | undefined>("")
  const [currentPage, setCurrentPage] = useState<string>()
  const [viewModal, setViewModal] = useState<string>("")
  const [showMenu, setShowMenu] = useState<string>("opacity-0")

  useEffect(() => {
    setSwitchTheme(resolvedTheme)
    if(setCurrentHomeTheme){
      setCurrentHomeTheme(resolvedTheme)
    }
  }, [resolvedTheme, setCurrentHomeTheme])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedUser = sessionStorage.getItem("currentUser");
        if (storedUser) {
          setCurrentUserId(JSON.parse(storedUser));

        }
        if(!storedUser && p == "/chat"){
          setViewModal("login")
        }
      } catch (error) {
        console.log(error)
      }
    };

    const fetchCurrentPage = async () => {
      try {
        const storedPage = localStorage.getItem("page");
        if (storedPage) {
          setCurrentPage(storedPage);
        } else {
          setCurrentPage("/")
        }
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchCurrentUser();
    fetchCurrentPage();
  }, [])

  const toggleTheme = () => {
    if(switchTheme == "light"){
      setSwitchTheme("dark")
      setTheme("dark")
      if (setCurrentHomeTheme) {
        setCurrentHomeTheme("dark");
      }
    } else {
      setSwitchTheme("light")
      setTheme("light")
      if (setCurrentHomeTheme) {
        setCurrentHomeTheme("dark");
      }
    }
  }

  const logOut = () => {
    sessionStorage.removeItem("currentUser")
    if(p == "/chat"){
      localStorage.setItem("page", "/");
      r.push("/")
    } else {
      window.location.reload();
    }
  }

  const GrabAllUsersChats = async (e:SessionStorage) =>{
    setCurrentUserId(e)
    sessionStorage.getItem("currentUser")
  }

  const handleCurrentPage = (page:string) => {
    localStorage.setItem("page", page);
    setCurrentPage(page)
    r.push(page)
  }

  return(
    <>
    <div id="header" className='bg-white p-3 flex w-full justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <Image alt="fictichat logo" width={100} height={100} onClick={()=>handleCurrentPage("/")} className='w-28 cursor-pointer' src="/fictichat.svg"/>
        <p id="header-desktop" className={`cursor-pointer font-bold ${currentPage == "/" ? "text-[#50A98D]" : "text-[#989898]"}`} onClick={()=>handleCurrentPage("/")}>Home</p>
        <p id="header-desktop" className={`cursor-pointer font-bold ${currentPage == "/characters" ? "text-[#50A98D]" : "text-[#989898]"}`} onClick={()=>handleCurrentPage("/characters")}>Characters</p>
      </div>
      
      <div id="header-desktop" className='flex gap-4 items-center'>
        <button className='cursor-pointer duration-200 hover:text-[#50A98D]' onClick={()=>{setViewModal("feedback")}}>Feedback</button>
        <Image alt={switchTheme || "icon"} onClick={()=>{toggleTheme()}} src={switchTheme == "light" ? "/dark.png" : "/light.png"} width={10} height={10} className="flex w-auto h-[25px] cursor-pointer"/>
        <button className='bg-[#287B62] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#50A98D]' onClick={()=>{currentUserId ? logOut() : setViewModal("login")}}>{currentUserId ? "Sign Out": "Sign In"}</button>
      </div>

      <div id="header-mobile" className='flex gap-4 items-center'>
        <Image alt={switchTheme || "icon"} onClick={()=>{toggleTheme()}} src={switchTheme == "light" ? "/dark.png" : "/light.png"} width={10} height={10} className="flex w-auto h-[25px] cursor-pointer"/>
        <Image alt="menu icon" onClick={()=>{setShowMenu(showMenu == "opacity-0" ? "opacity-100" : "opacity-0" )}} src="/menu.png" width={10} height={10} className="flex w-auto h-[25px] cursor-pointer"/>
      </div>
      

      <div id="header-mobile" className={`flex-col absolute right-0 ${switchTheme == "light" ? "bg-slate-200 border-gray-300" : "bg-slate-900 border-gray-600"} duration-200 top-14 z-10 border-2  ${showMenu}`}>
        <div className={`cursor-pointer font-bold p-2  ${currentPage == "/" ? "text-[#50A98D]" : "text-[#989898]"}`} onClick={()=>handleCurrentPage("/")}>Home</div>
        <div className={`cursor-pointer font-bold p-2 ${currentPage == "/characters" ? "text-[#50A98D]" : "text-[#989898]"}`} onClick={()=>handleCurrentPage("/characters")}>Characters</div>
        <div className={`p-2 border-t-2 ${switchTheme == "light" ? "border-gray-300" : "border-gray-600"} cursor-pointer duration-200 hover:text-[#50A98D]`} onClick={()=>{setViewModal("feedback")}}>Feedback</div>
        <div className="p-2 bg-[#287B62] text-white py-2 px-3 cursor-pointer duration-200 hover:bg-[#50A98D]" onClick={()=>{currentUserId ? logOut() : setViewModal("login")}}>{currentUserId ? "Sign Out": "Sign In"}</div>
      </div>
      
    </div>
    
    {viewModal == "feedback" && <FeedbackForm showModal={viewModal} closeFeedback={setViewModal}/>}
    {viewModal == "login" && <LogIn showModal={viewModal} closeFeedback={setViewModal} currentUserId={(e:SessionStorage)=>GrabAllUsersChats(e)}/>}
    </>
  )
}