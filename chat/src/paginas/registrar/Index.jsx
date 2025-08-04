import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../services/api"

const schema = z.object({
    email: z.string().email("Email inválido"),
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    senha: z.string().min(5, "Senha deve ter pelo menos 5 caracteres"),
    ReSenha: z.string().min(5, "Confirmação deve ter pelo menos 5 caracteres")
}).refine((data) => data.senha === data.ReSenha, {
    message: "As senhas não coincidem",
    path: ["ReSenha"]
})

const Registrar = () => {

  const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })
    function submit(data) {
       api.post("/usuarios",data).then(res=>{
            if(res.status != 200){
                toast.error(res)
            }else{
                navigate("/")
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    return (
        <>
            <div className="flex h-dvh w-dvw justify-center items-center">
                <div>
                    <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4 min-w-70 md:w-100'>
                        <div>


                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>


                            <Label htmlFor="nome">Nome</Label>
                            <Input type="text"
                                id="nome"
                                placeholder="Nome"
                                {...register("nome")}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div>
                            <Label htmlFor="senha">Senha</Label>
                            <Input type="password" id="senha"
                                placeholder="Senha"
                                {...register("senha")}
                            />
                            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
                        </div>



                        <div>
                            <Label htmlFor="Resenha">Re-Senha</Label>
                            <Input type="password" id="Resenha" placeholder="Re-Senha"
                                {...register("ReSenha")}
                            />

                            {errors.ReSenha && <span className="text-red-500 text-sm">{errors.ReSenha.message}</span>}

                        </div>



                        <Button type="submit"
                            className="mt-5 cursor-pointer w-[100%]">Registrar</Button>

                        <Link to="/">
                            <Button className="mt-5 cursor-pointer w-[100%]">Back</Button>
                        </Link>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Registrar
