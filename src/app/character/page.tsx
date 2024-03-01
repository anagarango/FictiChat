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

  const handleResponses = async (e:any, mess:string, char:string) => {
    e.preventDefault()
    if(!mess){
      return
    }
    const response =  await axios({
      method:'post',
      url: `/api/character?character=${char}`,
      data:{
        message: mess
      }
    });
    const messageData = await response.data
    setChat([...chat, {"user":character, "message":messageData.message}])
    setMessage("")
  }
  

  return (
    <main className="flex min-h-screen flex-col p-24 bg-slate-100">
      <button onClick={()=>r.push("/")}>Return</button>
      <h1>Choose Your Character!</h1>
      <div className='overflow-auto whitespace-nowrap'>
        {chat.map((o,i)=>(
          <div key={i} className="flex mb-2 p-2">
            <img src={o.user == "You" ? "/user.png" : `/characters/${character}.png`} className={`rounded-full object-cover w-[40px] h-[40px]`}/>
            <div className='pl-2 pt-2'>
              <h4 className='font-bold'>{o.user}</h4>
              {o.user == "You" ? (<p>{o.message}</p>) :
                  <p className="typewriter">
                  {o.message.split('').map((letter, index) => (
                    <span key={index} style={{animationDelay: `${20 * index}ms`}}>{letter}</span>
                  ))}
                </p>
                
              }
            </div>
            
          </div>
        ))}
      </div>
      <form onSubmit={(e)=>handleResponses(e, message, character)}>
      <input type="text" placeholder='Message CherGPT' value={message} onChange={(e)=>{setMessage(e.target.value)}} className="outline-none p-2 rounded-md border border-gray-300"/>
      <button type="submit" onClick={()=>{if(message){setChat([...chat, {"user":"You", "message":message}])}}}>Submit</button>
      </form>

    </main>
  )
}
