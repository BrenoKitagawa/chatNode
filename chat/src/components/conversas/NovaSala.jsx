import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const NovaSala = ({newSala}) => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='flex flex-col gap-5 w-100'>
                <div>
                    <Label htmlFor="nome">Nome da sala</Label>
                    <Input type="nome" id="nome" placeholder="Nome" />
                </div>

                <div>
                    <Label htmlFor="senha">Senha da sala</Label>
                    <Input type="senha" id="senha" placeholder="senha" />

                </div>

                <Button className="cursor-pointer">Criar sala</Button>
                <Button className="cursor-pointer" onClick={newSala}>Voltar</Button>

            </div>
        </div>
    )
}

export default NovaSala
