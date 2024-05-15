"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Image from 'next/image'
import { CopyBlock, CodeBlock, shadesOfPurple, atomOneLight } from 'react-code-blocks';

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Home() {
  const r = useRouter()
  const [currentUserId, setCurrentUserId] = useState<SessionStorage | null>(null);
  const [currentHomeTheme, setCurrentHomeTheme] = useState<string>()
  
  const code = `https://fictichat.vercel.app/api/char?apiKey=APIKEY&character=CHARACTER_NAME&message:NEWMESSAGE`

  const text = `//Example of what this record of conversations array would look like for each character:
  [
    {
      user: 'Elmo', message:'Hi there, its nice to see you again, what do you wanna ask me?', 
      role:'assistant'
    },{
      user:'FictiChat User', message:'Whats your favourite color?', 
      role:'user'
    },{
      user: 'Elmo', message:'Well my favourite color is red! I like red because of apples, strawberries, umbrellas, bicycles, and oh, me! Ha ha ha ha! Whats your favourite color?', 
      role:'assistant'
    },{
      user:'FictiChat User', message:'My favourite color is blue.', 
      role:'user'
    }
  ]
  `

  const example = `const response = await axios("https://fictichat.vercel.app/api/char?apiKey=1a2b3c4d5e6f7g8h9i&character=Elmo&message=What%20else%20do%20you%20like%20about%20the%20color%20red?");`

  const result = `{
    "message": "Oh boy, Elmo loves the color red so much! Red is so bright and fun, it makes Elmo feel happy and excited. Elmo also knows that red is the color of love, like when mommy and daddy give Elmo big hugs and kisses. Red is everywhere, from Elmo's favorite fire truck to juicy apples. Elmo just can't get enough of that wonderful color!"
}
`


  return (
    <main id="main" className="flex w-screen flex-col items-center bg-slate-100">
      <Header currentUserId={currentUserId ?  currentUserId : ""} setCurrentUserId={(e:SessionStorage) => setCurrentUserId(e)} setCurrentHomeTheme={(e:string)=>setCurrentHomeTheme(e)}/>
      
      <div className='flex flex-col items-center max-w-[900px] p-[20px] w-full justify-around'>
        <h1 className='text-4xl font-bold text-center pt-20'>FictiChat API Documentation</h1>
        <h3 className='text-xl font-bold w-full py-8'>Description</h3>
        <p>FictiChat allows you to bring the use of chatting with characters or anyone else and bring it to your own creative work!</p>
        

        <div className='w-full pt-10'>
          <h3 className='text-xl font-bold w-full py-8'>URL GET Endpoint</h3>
          <CopyBlock customStyle={{overflowX:"scroll"}} theme={shadesOfPurple} text={code} language="javascript" wrapLongLines/>
        </div>

        <div className='w-full pt-10 pb-32'>
          <h3 className='text-xl font-bold w-full py-8'>Parameters</h3>
          <div className='flex gap-5 pb-20'>
            <div className='w-1/3'>
              <CodeBlock customStyle={{width: 'fit-content', maxHeight:"fit-content"}} language="javascript" theme={shadesOfPurple} text="APIKEY" showLineNumbers={false} wrapLongLines/>
            </div>
            <div className='w-2/3'>
              <p className={`${currentHomeTheme == "light" ? "bg-white" : "bg-black"} w-fit italic mb-3 p-2 rounded-md`}>string</p>
              <p>Enter your <a className='text-sky-600' href='https://openai.com/index/openai-api/' target="_blank">OpenAI </a>key</p>
            </div>
          </div>
          <div className='flex gap-5 pb-20'>
            <div className='w-1/3'>
              <CodeBlock customStyle={{ maxHeight:"fit-content"}} language="javascript" theme={shadesOfPurple} text="CHARACTER_NAME" showLineNumbers={false} wrapLongLines/>
            </div>
            <div className='w-2/3'>
              <p className={`${currentHomeTheme == "light" ? "bg-white" : "bg-black"} w-fit italic mb-3 p-2 rounded-md`}>string</p>
              <p>Enter whichever character name you'd like to chat with i.e. Albert Einstein, Elmo, etc.</p>
            </div>
          </div>
          <div className='flex gap-5'>
            <div className='w-1/3'>
              <CodeBlock customStyle={{ maxHeight:"fit-content"}} language="javascript" theme={shadesOfPurple} text="NEWMESSAGE" showLineNumbers={false} wrapLongLines/>
            </div>
            <div className='w-2/3'>
              <p className={`${currentHomeTheme == "light" ? "bg-white" : "bg-black"} w-fit italic mb-3 p-2 rounded-md`}>string</p>
              <p >New message the user is sending to the character.</p>
            </div>
          </div>
        </div>    
        <div className='w-full pb-32'>
          <h3 className='text-xl font-bold w-full pb-8'>Example of API call using axios</h3>
          <CopyBlock customStyle={{overflowX:"scroll", marginBottom:"8rem"}} theme={shadesOfPurple} text={example} language="javascript" wrapLongLines/>
          <h3 className='text-xl font-bold w-full pb-8'>Example of API response</h3>
          <CopyBlock customStyle={{overflowX:"scroll"}} theme={atomOneLight} text={result} language="javascript" showLineNumbers wrapLongLines/>
        </div>
      </div>
      <footer className={`${currentHomeTheme == "light" ? "bg-white" : "bg-slate-900"} p-4 w-full flex justify-between`}>
        <Image alt="fictichat logo" width={100} height={100} className='w-24' src="/fictichat.svg"/>
        <div className='flex gap-2'>
          <a href="https://www.linkedin.com/in/anagarango/" target="_blank">
            <Image alt="linkedin logo" width={100} height={100} className='w-6' src="/linkedin.png"/>
          </a>
          <a href="https://github.com/anagarango" target="_blank">
            <Image alt="github logo" width={100} height={100} className='w-6' src="/github.png"/>
          </a>
        </div>
      </footer>
    </main>
  )
}
