"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"

interface SearchParams {
  character:string
}

interface Params {
  params:object,
  searchParams:SearchParams
}

interface ChatObject {
  user:string,
  message:string
}

export default function Character(characterName:Params) {
  const r = useRouter()

  const character:string = characterName.searchParams.character || ""
  const [chat, setChat] = useState<ChatObject[]>([])
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleResponses = async (e:any, mess:string, char:string) => {
    e.preventDefault()
    if(!mess){
      return
    }
    setLoading(true)
    setMessage("")
    const response =  await axios({
      method:'post',
      url: `/api/character?character=${char}`,
      data:{
        message: mess
      }
    });
    const messageData = await response.data
    setChat([...chat, {"user":character, "message":messageData.message}])
    setLoading(false)
  }

  return (
    <main className="h-screen p-[20px] bg-slate-100">
      <div className="flex flex-col bg-white rounded-lg h-full">

        <div className='flex items-center border-b-2 p-4'>
          <img src="/return.png" onClick={()=>r.push("/")} className="w-[20px] mr-5 cursor-pointer"/>
          <div className="relative rounded-full max-w-[50px] inline-block bg-[#D9F3EB]">
            <img src={`/characters/${character}.png`} className="rounded-full object-cover w-[50px] h-[50px]"/>
          </div>
          <h2 className='font-bold text-lg pl-2'>{character}</h2>
        </div>
        
        <div className='flex flex-col p-5 overflow-y-scroll overflow-x-hidden h-full'>
          {chat.length < 1 && <div className='flex h-full justify-center items-center flex-col'>
              <div className="relative rounded-full max-w-[100px] max-h-[100px] inline-block bg-[#D9F3EB]">
                <img src={`/characters/${character}.png`} className="rounded-full object-cover w-[100px] h-[100px]"/>
              </div>
              <h2 className='font-bold text-xl pt-4'>Start a chat with me!</h2>
            </div> 
          }
          {chat.map((o,i)=>(
            <div key={i} className={`flex mb-2 p-2 max-w-[45%] ${o.user == "You" ? "self-end bg-[#97D8C4] w-fit rounded-tl-md rounded-br-md rounded-bl-md border border-[#87BFAE]" : "bg-[#D9D9D9] w-fit rounded-tr-md rounded-br-md rounded-bl-md border border-[#CACACA]"}`}>
              {o.user == "You" ? (<p>{o.message}</p>) 
                :
                <p className="typewriter">
                  {o.message.split(' ').map((letter, index) => (
                    <span key={index} style={{animationDelay: `${20 * index}ms`, whiteSpace: "pre"}}>{letter} </span>
                  ))}
                  
                </p>
              }
            </div>
          ))}
        </div>
        <form onSubmit={(e)=>handleResponses(e, message, character)} className="flex m-4 bg-[#D9F3EB] py-3 px-5 rounded-md justify-between border border-[#97D8C4]">
          <input type="text" placeholder={`Message ${character} GPT...`} value={message} onChange={(e)=>{setMessage(e.target.value)}} className="outline-none  bg-[#D9F3EB] w-10/12"/>
          <button type="submit" onClick={()=>{if(message){setChat([...chat, {"user":"You", "message":message}])}}}>
            <img src={loading ? "/loading.gif" : "/arrow.png"} className='w-4'/>
          </button>
        </form>
      </div>
    </main>
  )
}
