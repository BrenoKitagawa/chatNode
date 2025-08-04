import React from 'react'
import { CaretDoubleRightIcon} from "@phosphor-icons/react"
const Conversa = () => {
  return (
    <div className='w-full h-20 border-2 rounded-2xl p-5 flex items-center justify-between cursor-pointer mb-2 '>
        <h1 className='text-2xl'>Sala: #200</h1>
        <CaretDoubleRightIcon size={32} />
    </div>
  )
}

export default Conversa
