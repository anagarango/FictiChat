import { useRouter } from "next/navigation"
import Image from 'next/image'

export default function Header({setViewFeedback}:{setViewFeedback:Function}){
  const r = useRouter()
  return(
    <div className='bg-white p-3 flex w-full justify-between items-center'>
      <Image alt="fictichat logo" width={100} height={100} onClick={()=>r.push("/")} className='w-32 cursor-pointer' src="/fictichat.svg"/>
      <div className='flex gap-3'>
        <button className='cursor-pointer duration-200 hover:text-[#50A98D]' onClick={()=>{setViewFeedback(true)}}>Feedback</button>
        <button className='bg-[#50A98D] text-white py-2 px-3 rounded-md cursor-pointer duration-200 hover:bg-[#97D8C4]'>Sign In</button>
      </div>
    </div>
  )
}