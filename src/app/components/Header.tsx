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

export default function Header({currentUserId, setCurrentUserId=()=>{}}:{currentUserId:SessionStorage | string, setCurrentUserId:Function}){
  const r = useRouter()
  const p = usePathname()

  const { resolvedTheme, setTheme } = useTheme()
  const [switchTheme, setSwitchTheme] = useState<string | undefined>("")
  const [currentPage, setCurrentPage] = useState<string>()
  const [viewModal, setViewModal] = useState<string>("")

  useEffect(() => {
    setSwitchTheme(resolvedTheme)
  }, [resolvedTheme])

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
    } else {
      setSwitchTheme("light")
      setTheme("light")
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
        <Image alt="fictichat logo" width={100} height={100} onClick={()=>handleCurrentPage("/")} className='w-32 cursor-pointer' src="/fictichat.svg"/>
        <p className={`cursor-pointer ${currentPage == "/" ? "text-[#50A98D] underline" : ""}`} onClick={()=>handleCurrentPage("/")}>Home</p>
        <p className={`cursor-pointer ${currentPage == "/characters" ? "text-[#50A98D] underline" : ""}`} onClick={()=>handleCurrentPage("/characters")}>Characters</p>
      </div>
      
      <div className='flex gap-4 items-center'>
        <button className='cursor-pointer duration-200 hover:text-[#50A98D]' onClick={()=>{setViewModal("feedback")}}>Feedback</button>
        <Image alt={switchTheme || "icon"} onClick={()=>{toggleTheme()}} src={switchTheme == "light" ? "/dark.png" : "/light.png"} width={10} height={10} className="flex w-auto h-[25px] cursor-pointer"/>
        <button className='bg-[#287B62] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#50A98D]' onClick={()=>{currentUserId ? logOut() : setViewModal("login")}}>{currentUserId ? "Sign Out": "Sign In"}</button>
      </div>
    </div>
    {viewModal == "feedback" && <FeedbackForm showModal={viewModal} closeFeedback={setViewModal}/>}
    {viewModal == "login" && <LogIn showModal={viewModal} closeFeedback={setViewModal} currentUserId={(e:SessionStorage)=>GrabAllUsersChats(e)}/>}
    </>
  )
}