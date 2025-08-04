import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaretDoubleRightIcon } from '@phosphor-icons/react'

const Chat = () => {
  return (
    <div className='flex justify-between flex-col h-full'>
                    <ScrollArea>oi</ScrollArea>

                    <div className='flex items-center justify-center gap-2 w-full'>
                        <Input />
                        <Button  className="h-full w-15 cursor-pointer"> <CaretDoubleRightIcon size={32} /></Button>
                    </div>
      
    </div>
  )
}

export default Chat
