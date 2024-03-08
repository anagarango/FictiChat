"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '../components/Header'
import FeedbackForm from '../components/FeedbackForm'
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
  message:string,
  role:string
}

export default function Character(characterName:Params) {
  const r = useRouter()

  const character:string = characterName.searchParams.character || ""
  const storedChat = localStorage.getItem(character);
  const [chat, setChat] = useState<ChatObject[]>(storedChat ? JSON.parse(storedChat) : [])
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [animation, setAnimation] = useState<string>("")
  const [viewFeedback, setViewFeedback] = useState<boolean>(false)

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
        context: chat,
        message: mess
      }
    });
    const messageData = await response.data
    setAnimation(messageData.message)
    setChat([...chat, {"user":character, "message":messageData.message, "role":"assistant"}])
    setLoading(false)
  }

  useEffect(() => {
    if(chat.length > 1){
      localStorage.setItem(character, JSON.stringify(chat))
    }
  }, [chat])

  return (
    <main className="flex flex-col h-[100vh] items-center bg-slate-100">
      <Header setViewFeedback={setViewFeedback}/>
      <FeedbackForm showFeedback={viewFeedback} closeFeedback={setViewFeedback}/>
      <div id="cool" className='w-full max-w-[1060px] p-[20px]'>
        <div className="flex flex-col bg-white rounded-lg h-full">
          <div className='flex items-center border-b-2 p-4'>
            <Image src="/return.png" alt="return button" width={70} height={70}  onClick={()=>r.push("/")} className="w-[20px] mr-5 cursor-pointer"/>
            <div className="relative rounded-full max-w-[50px] inline-block bg-[#D9F3EB]">
              <Image src={`/characters/${character}.png`} alt={`${character} image`} width={70} height={70}  className="rounded-full object-cover w-[50px] h-[50px]"/>
            </div>
            <h2 className='font-bold text-lg pl-2'>{character}</h2>
          </div>
          
          <div className='flex flex-col p-5 overflow-y-scroll overflow-x-hidden h-full'>
            {chat.length < 1 && <div className='flex h-full justify-center items-center flex-col'>
                <div className="relative rounded-full max-w-[100px] max-h-[100px] inline-block bg-[#D9F3EB]">
                  <Image src={`/characters/${character}.png`} alt={`${character} image`} width={70} height={70}  className="rounded-full object-cover w-[100px] h-[100px]"/>
                </div>
                <h2 className='font-bold text-xl pt-4'>Start a chat with me!</h2>
              </div> 
            }
            {chat.map((o,i)=>(
              <div key={i} className={`flex mb-3 p-[10px] max-w-[75%] ${o.user == "You" ? "self-end bg-[#97D8C4] w-fit rounded-tl-2xl rounded-br-2xl rounded-bl-2xl border border-[#87BFAE]" : "bg-[#D9D9D9] w-fit rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-[#CACACA]"}`}>
                {o.user == "You" ? (<p>{o.message}</p>) 
                  :
                  <p className="typewriter">
                    {o.message.split(' ').map((letter, index) =>(
                      <span key={index} style={{animationDelay: animation == o.message ? `${25 * index}ms` : "0ms", whiteSpace: "pre"}}>{letter} </span>
                    ))}
                    
                  </p>
                }
              </div>
            ))}
          </div>
          <form onSubmit={(e)=>handleResponses(e, message, character)} className="flex m-4 bg-[#D9F3EB] py-3 px-5 rounded-md justify-between border border-[#97D8C4]">
            <input type="text" placeholder={`Chat with ${character}...`} value={message} onChange={(e)=>{setMessage(e.target.value)}} className="outline-none  bg-[#D9F3EB] w-10/12"/>
            <button type="submit" onClick={()=>{if(message){setChat([...chat, {"user":"You", "message":message, "role":"user"}])}}}>
              <Image width={70} height={70}  alt={loading ? "loading gif" : "send.gif"} src={loading ? "/loading.gif" : "/arrow.png"} className='w-4'/>
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
