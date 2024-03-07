"use client"
import Image from 'next/image'
import Characters from "../../public/characters.json"
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const r = useRouter()
  
  const [allLocalStorage, setAllLocalStorage] = useState<any>({});
  const [password, setPassword] = useState<string>("")
  const [check, setCheck] = useState("checking")
  const [viewFeedback, setViewFeedback] = useState<boolean>(false)

  useEffect(() => {
    if (window.localStorage) {
      setAllLocalStorage({...localStorage})
    }
  }, []);

  const handleSelectedCharacter = (characterName: string) => {
    r.push(`/character?character=${characterName}`)
  }

  async function CheckPassword(e:any){
    e.preventDefault()
    const res = await fetch(`/api/password?pass=${password}`)
    const passwordCheck = await res.json()
    if(passwordCheck.password == "correct"){
      setCheck("correct")
    } else {
      setCheck("wrong")
    }
  }


  return (
    <main className="flex h-screen max-h-screen flex-col items-center bg-slate-100">
      {check !== "correct" ? 
        <form onSubmit={(e)=>CheckPassword(e)} className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Quien fue la razon porque te enamorastes con el papa?</h1>
          <input className="my-5" type="text" placeholder="Contraseña..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <button type="submit" className="bg-green-400 p-2 mb-10">Entregar</button>
          <h2 className="text-red-600 font-black">{check == "wrong" ? "Wrong Password!" : ""}</h2>
        </form>
      :
        <>
          <Header setViewFeedback={setViewFeedback}/>
          <FeedbackForm showFeedback={viewFeedback} closeFeedback={setViewFeedback}/>
          <div id="container" className='flex max-w-[1100px] gap-4 p-[20px]'>
            <div id="characters-section" className='w-2/4 overflow-y-auto flex flex-col gap-2'>
              {Characters.map((o, i) => {
                var sectionName = Object.keys(o) as (keyof typeof o)[]
                var charcterArray: any = o[sectionName[0]];
                return (
                  <div key={i} className="bg-white p-3 rounded-md">
                    <h1 className='text-lg font-bold mb-3'>{Object.keys(o)}</h1>
                    <div className="whitespace-nowrap overflow-x-auto">
                    {charcterArray.map((character:string, index:number) => (
                      <div key={`${index} + ${i}`} onClick={()=>handleSelectedCharacter(character)} className="relative rounded-full max-w-[100px] inline-block mr-3 mb-[10px] cursor-pointer bg-[#D9F3EB]">
                        <Image src={`/characters/${character}.png`} alt={character} width={100} height={100} className="rounded-full object-cover w-[100px] h-[100px]" />
                        <p className={`absolute opacity-0 text-center flex justify-center items-center text-white text-[13px] whitespace-break-spaces w-[100px] h-[100px] rounded-full px-2 font-bold duration-200 hover:opacity-100 hover:bg-gray-950/50 top-0`}>
                          {character.split(' ').map((word, indexWord) => {
                            if(indexWord == 0){ 
                              return(
                                <span key={`word:${indexWord}`}>
                                  {word}
                                  <br />
                                </span>
                              )
                            } else {
                              return `${word} `
                            }
                          })}
                        </p>
                      </div>
                    ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div id="messages-section" className='flex flex-col w-2/4 bg-white p-3 rounded-md'>
              <h1 className='text-lg font-bold mb-3'>Messages</h1>
              {Object.keys(allLocalStorage).length < 1 && 
                <div className='h-full flex flex-col justify-center items-center p-2'>
                  <Image src="/Conversation.svg" height={96} width={96} alt="text bubbles" className='w-24 mb-4'/>
                  <p className='text-center'>No messages yet, start the conversation!</p>
                </div>
              }
              {Object.keys(allLocalStorage).map((o,i)=>{
                  var lastMessageObject = JSON.parse(allLocalStorage[o])
                  return(
                    <div key={i} onClick={()=>handleSelectedCharacter(o)} className='flex items-center border-b p-2 cursor-pointer hover:bg-slate-100'>
                      <Image src={`/characters/${o}.png`} width={70} height={70} alt={o} className={`rounded-full object-cover min-w-[70px] w-[70px] h-[70px] bg-[#D9F3EB]`} />
                      <div className='pl-3 overflow-hidden'>
                        <h3 className='text-md font-bold'>{o}</h3>
                        <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{lastMessageObject[lastMessageObject.length - 1]?.message}</p>
                      </div>
                    </div>
                  )
              })}
              </div>
            </div>
        </>}
    </main>
  )
}
