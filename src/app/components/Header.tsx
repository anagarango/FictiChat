import { useRouter } from "next/navigation"

export default function Header({setViewFeedback}:{setViewFeedback:Function}){
  const r = useRouter()
  return(
    <div className='bg-white px-3 py-4 flex w-full justify-between items-center'>
      <img onClick={()=>r.push("/")} className='w-32 cursor-pointer' src="/fictichat.svg"/>
      <div className='flex gap-3'>
        <button className='cursor-pointer duration-200 hover:text-[#50A98D]' onClick={()=>{setViewFeedback(true)}}>Feedback</button>
        <button className='bg-[#50A98D] text-white py-1 px-2 rounded-md cursor-pointer duration-200 hover:bg-[#97D8C4]'>Sign In</button>
      </div>
    </div>
  )
}