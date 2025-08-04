import React, { useState } from 'react'
import Conversa from './Conversa'

import {Button} from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import NovaSala from './NovaSala'
import Chat from './Chat'
export const Conversas = () => {

    const [sala,setSala] = useState(false)

    function criarNovaSala(){
            setSala(!sala)
    }


  return (
    <>
    <div className='flex w-full gap-5'>
    <ScrollArea className='h-full w-100 flex flex-col p-5 ' style={{display:sala? 'none' :'flex'}}>
        <Button onClick={criarNovaSala} className="cursor-pointer mb-5 w-full">Criar nova sala</Button>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        <Conversa/>
        </ScrollArea>  
{sala ?
      <div className={`${sala ? 'sm:block' : 'hidden'} w-full border-2 h-full rounded-2xl p-5`}>
                 <NovaSala newSala={criarNovaSala} />
        </div>
        : 
        <div className={` sm:block hidden w-full border-2 h-full rounded-2xl p-5`}>
                <Chat/>
        </div>

      
}
  </div>
 
      </>
  )
}

