import React from 'react'

export const Mensagem = ({fromMe,nome,text,horas}) => {



    return (
        <>
        {fromMe ?
        <div className='text-black bg-blue-200 max-w-100 rounded-2xl p-4 flex items-center justify-between'>
            <div>
                <p>{nome}:</p>
                <h1>{text}</h1>
            </div>
            <p className='self-end'>{horas}</p>
        </div> : 
        
        <div className='self-end-safe text-black bg-blue-300 max-w-100 rounded-2xl p-4 flex items-center justify-between '>
            <div >
                <p>{nome}:</p>
                <h1>{text}</h1>
            </div>

         <p className='self-end'>{horas}</p>
    
        </div> 
}
        </>
    )
}
