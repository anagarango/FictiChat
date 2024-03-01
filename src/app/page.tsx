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
    <main className="flex min-h-screen flex-col p-24">
      <h1>Choose Your Character!</h1>
      <div className='overflow-auto whitespace-nowrap'>
        {Characters.map((o, i) => (
          <div key={o} onMouseOver={() => setHoverName(o)} onMouseLeave={() => setHoverName("")} onClick={()=>handleSelectedCharacter(o)} className={`relative rounded-full max-w-[130px] inline-block mr-3 mb-3 ${i % 4 == 0 ? 'bg-red-200 hover:bg-red-950' : i % 3 == 0 ? "bg-orange-200 hover:bg-orange-950" : i % 2 == 0 ? "bg-lime-200 hover:bg-lime-950" : "bg-blue-200 hover:bg-blue-950"}`}>
            <Image src={`/characters/${o}.png`} alt={o} width={100} height={100} className={`rounded-full object-cover w-[130px] h-[130px] ${hoverName == o ? "brightness-50" : ""}`} />
            {hoverName == o && <p className={`absolute text-center text-white whitespace-break-spaces w-[130px] px-3 font-bold ${o.length >= 13 ? "top-[30%]" : "top-[40%]"}`}>{o}</p>}
          </div>
        ))}
      </div>

    </main>
  )
}
