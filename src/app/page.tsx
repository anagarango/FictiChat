"use client"
import Image from 'next/image'
import Characters from "../../public/characters.json"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const r = useRouter()
  const [hoverName, setHoverName] = useState<string | null>(null)
  const [password, setPassword] = useState<string>("")
  const [check, setCheck] = useState("checking")

  const handleSelectedCharacter = (characterName: string) => {
    r.push(`/character?character=${characterName}`)
  }

  async function CheckPassword(e:any){
    e.preventDefault()
    const res = await fetch(`/api/password?pass=${password}`)
    const passwordCheck = await res.json()
    console.log(passwordCheck.password)
    if(passwordCheck.password == "correct"){
      setCheck("correct")
    } else {
      setCheck("wrong")
    }
  }


  return (
    <main className="flex min-h-screen flex-col p-[20px] bg-slate-100">
      {check !== "correct" ? 
        <form onSubmit={(e)=>CheckPassword(e)} className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Quien fue la razon porque te enamorastes con el papa?</h1>
          <input className="my-5" type="text" placeholder="Contraseña..." value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <button type="submit" className="bg-green-400 p-2 mb-10">Entregar</button>
          <h2 className="text-red-600 font-black">{check == "wrong" ? "Wrong Password!" : ""}</h2>
        </form>
      :
      <>
      <h1 className='text-xl font-bold text-center mb-10 mt-5'>Welcome to CherGPT! Chat with your favourite character</h1>
        {Characters.map((o, i) => {
          var sectionName = Object.keys(o) as (keyof typeof o)[]
          var charcterArray: any = o[sectionName[0]];
          return (
            <div key={i} className="bg-white p-3 mb-3 rounded-md">
              <h1 className='text-lg font-bold mb-3'>{Object.keys(o)}</h1>
              <div className="whitespace-nowrap overflow-x-auto rounded-md">
              {charcterArray.map((character:string, index:number) => (
                <div key={index} onMouseOver={() => setHoverName(character)} onMouseLeave={() => setHoverName("")} onClick={()=>handleSelectedCharacter(character)} className="relative rounded-full max-w-[130px] inline-block mr-3 mb-[10px] cursor-pointer bg-[#D9F3EB] hover:bg-[#567C70]">
                  <Image src={`/characters/${character}.png`} alt={character} width={100} height={100} className={`rounded-full object-cover w-[130px] h-[130px] ${hoverName == character ? "brightness-50" : ""}`} />
                  {hoverName == character && 
                  <p className={`absolute text-center text-white whitespace-break-spaces w-[130px] px-3 font-bold ${character.includes(' ') ? "top-[30%]" : "top-[40%]"}`}>
                    {character.split(' ').map((word, index) => {
                      if(index == 0){ 
                        return(
                          <>
                            {word}
                            <br />
                          </>
                        )
                      } else {
                        return `${word} `
                      }
                    })}
                  </p>}
                </div>
              ))}
              </div>
            </div>
          )
        })}
        </>}
    </main>
  )
}
