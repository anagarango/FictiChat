"use client"
import Image from 'next/image'
import Characters from "../../../public/characters.json"
import Header from '../components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SessionStorage {
  id:number,
  username:string,
  password:string,
  createdAt:string,
  email:string
}

export default function Character() {
  const r = useRouter()
  
  const [currentUserId, setCurrentUserId] = useState<SessionStorage>();
  const [currentUserIdSavedChats, setCurrentUserIdSavedChats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const handleSelectedCharacter = (characterName: string) => {
    r.push(`/chat?character=${characterName}`)
  }

  const handleDeleteCharacterChat = async (characterName: string) => {
    if(currentUserId){
      const response = await axios({
        method: 'delete',
        url: `/api/mysql/chat/home?character=${characterName}&currentUserId=${currentUserId.id}`,
      });

      const data = await response.data

      if(data){
        setCurrentUserIdSavedChats((oldValues: any[]) => {
          return oldValues.filter(messages => messages.character_name !== characterName)
        })
      }
    }
  }

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        if (currentUserId){
          const response = await axios({
            method: 'get',
            url: `/api/mysql/chat/home?currentUserId=${currentUserId.id}`,
          });
          const messageData = await response.data;
          if (messageData.length !== 0) {
            setCurrentUserIdSavedChats(messageData);
          }
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchChatData();
  }, [currentUserId]);

  return (
    <main id="main" className="flex h-screen max-h-screen w-screen flex-col items-center bg-slate-100">
      <Header currentUserId={currentUserId ?  currentUserId : ""} setCurrentUserId={(e:SessionStorage) => setCurrentUserId(e)}/>
      <div id="container" className='flex max-w-[900px] gap-4 p-[20px]'>
        <div id="characters-section" className='w-2/4 overflow-y-auto flex flex-col gap-2'>
          {Characters.map((o, i) => {
            var sectionName = Object.keys(o) as (keyof typeof o)[]
            var charcterArray: any = o[sectionName[0]];
            return (
              <div id="characters" key={i} className="bg-white p-3 rounded-md">
                <h1 className='text-lg font-bold mb-3'>{Object.keys(o)}</h1>
                <div className="whitespace-nowrap overflow-x-auto">
                {charcterArray.map((character:string, index:number) => (
                  <div id="character-background" key={`${index} hey ${i}`} onClick={()=>handleSelectedCharacter(character)} className="relative rounded-full max-w-[100px] inline-block mr-3 mb-[10px] cursor-pointer bg-[#D9F3EB]">
                    <Image src={`/characters/${character}.png`} alt={character} width={100} height={100} className="rounded-full object-cover w-[100px] h-[100px]" blurDataURL="https://i.pinimg.com/originals/d7/49/85/d749850e79c94f9a95906d0dfc392f4f.gif" placeholder="blur"/>
                    <p className={`absolute opacity-0 text-center flex justify-center items-center text-white text-[13px] whitespace-break-spaces w-[100px] h-[100px] rounded-full px-2 font-bold duration-200 hover:opacity-100 hover:bg-gray-950/50 top-0`}>
                      {character.split(' ').map((word, indexWord) => {
                        if(indexWord == 0){ 
                          return(
                            <React.Fragment key={indexWord}>
                                {word}
                                <br />
                            </React.Fragment>
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
        <div id="messages-section" className='flex flex-col w-2/4 h-full bg-white p-3 rounded-md'>
          <h1 className='text-lg font-bold mb-3'>Messages</h1>

          {loading && 
            <div className='min-h-full flex flex-col justify-center items-center mt-[-30px]'>
              <Image src="/spinner.svg" height={96} width={96} alt="text bubbles" className='h-2/4 mb-4 max-h-24'/>
            </div>
          }
          <div className={(currentUserIdSavedChats.length  && !loading) ? "overflow-y-auto" : "h-full flex flex-col justify-center items-center"}>
            {(currentUserIdSavedChats.length === 0 && !loading) ? (
              <>
                <Image src="/Conversation.svg" height={96} width={96} alt="text bubbles" className='h-2/4 mb-4 max-h-24'/>
                {currentUserId && <p className="font-bold">{currentUserId.username},</p>}
                <p className='text-center'>{currentUserId ? <span>no messages yet, start the conversation!</span> : "Sign In to start a conversation!"}</p>
              </>
              ) : (
              currentUserIdSavedChats.map((o:any, i:number) => {
                var messages = JSON.parse(o.messages)
                console.log(currentUserIdSavedChats)
                return (
                  <div id="messages-kept" key={`message ${i}`} className='flex items-center justify-between w-full border-b p-2 hover:bg-slate-100'>
                    <div onClick={() => handleSelectedCharacter(o.character_name)} className='flex items-center cursor-pointer overflow-hidden'>
                      <Image src={`/characters/${o.character_name}.png`} width={70} height={70} alt={o.character_name} className={`rounded-full object-cover min-w-[70px] w-[70px] h-[70px]`} />
                      <div className='mx-3 overflow-hidden'>
                        <h3 className='text-md font-bold'>{o.character_name}</h3>
                        <p className='truncate'>{messages[messages.length - 1].message}</p>
                      </div>
                    </div>
                    <Image className='w-3 mr-2 cursor-pointer' onClick={() => handleDeleteCharacterChat(o.character_name)} width={70} height={70} alt="Delete" src="/close.png"/>
                  </div>
                );
              })
              )
            }
          </div>
        </div>
      </div>
    </main>
  )
}
