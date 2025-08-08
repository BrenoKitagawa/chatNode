import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaretDoubleRightIcon } from '@phosphor-icons/react'
import { Mensagem } from './Mensagem'
import { Header } from './Header'

const Chat = () => {


     const text = [
    {
        fromMe:true,
        nome:"breno",
        text:"lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum voluptate necessitatibus, minima commodi maiores molestias aspernatur voluptatem quod quas illo nobis blanditiis, voluptas dolores veniam magnam eligendi? Architecto, hic.",
         createdAt:"10:00"
    }, {
        fromMe:false,
        nome:"isadora",
        text:"lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum voluptate necessitatibus, minima commodi maiores molestias aspernatur voluptatem quod quas illo nobis blanditiis, voluptas dolores veniam magnam eligendi? Architecto, hic.",
        createdAt:"12:00"
    },  {
        fromMe:true,
        nome:"isadora",
        text:"lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum voluptate necessitatibus, minima commodi maiores molestias aspernatur voluptatem quod quas illo nobis blanditiis, voluptas dolores veniam magnam eligendi? Architecto, hic.",
        createdAt:"12:00"
    }, {
        fromMe:false,
        nome:"isadora",
        text:"lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum voluptate necessitatibus, minima commodi maiores molestias aspernatur voluptatem quod quas illo nobis blanditiis, voluptas dolores veniam magnam eligendi? Architecto, hic.",
        createdAt:"12:00"
    }
    ]


  return (

    <div className='flex justify-between flex-col h-full relative'>
     
                    <ScrollArea className="relative">

                      {text.map((item,index)=>(
                                         <Mensagem className="self-start"  key={index} nome={item.nome} fromMe={item.fromMe} text={item.text} horas={item.createdAt}/>
                      ))}
     
                    </ScrollArea>

                    <div className='flex items-center justify-center gap-2 w-full'>
                        <Input className="font-extrabold text-2xl h-14" />
                        <Button  className="h-full w-15 cursor-pointer"> <CaretDoubleRightIcon size={32} /></Button>
                    </div>
      
    </div>
    
     
  )
}

export default Chat
