"use client"
import Image from 'next/image'
import Characters from "../../public/characters.json"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const r = useRouter()
  const [hoverName, setHoverName] = useState<string | null>(null)

  const handleSelectedCharacter = (characterName: string) => {
    r.push(`/character?character=${characterName}`)
  }

  return (
    <main className="flex min-h-screen flex-col p-[20px] bg-slate-100">
      <h1 className='text-xl font-bold text-center mb-10 mt-5'>Welcome to CherGPT! Chat with your favourite character</h1>
        {Characters.map((o, i) => {
          var characterArray = Object.keys(o) as (keyof typeof o)[]
          return (
            <div key={i} className="bg-white p-3 mb-3 rounded-md">
              <h1 className='text-lg font-bold mb-3'>{Object.keys(o)}</h1>
              <div className="whitespace-nowrap overflow-x-auto rounded-md">
              {o[characterArray[0]].map((character:string, index:number) => (
                <div key={index} onMouseOver={() => setHoverName(character)} onMouseLeave={() => setHoverName("")} onClick={()=>handleSelectedCharacter(character)} className="relative rounded-full max-w-[130px] inline-block mr-3 mb-[10px] cursor-pointer bg-[#D9F3EB] hover:bg-[#567C70]">
                  <Image src={`/characters/${character}.png`} alt={character} width={100} height={100} className={`rounded-full object-cover w-[130px] h-[130px] ${hoverName == character ? "brightness-50" : ""}`} />
                  {hoverName == character && <p className={`absolute text-center text-white whitespace-break-spaces w-[130px] px-3 font-bold ${character.length >= 13 ? "top-[30%]" : "top-[40%]"}`}>{character}</p>}
                </div>
              ))}
              </div>
            </div>
          )
        })}
    </main>
  )
}
