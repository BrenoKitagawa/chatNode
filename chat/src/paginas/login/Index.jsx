import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {toast} from "react-toastify"
import api from '../../services/api'
const schema = z.object({
  email: z.string().email("Email invalido"),
  senha: z.string().min(5, "Senha curta")
})


const Login = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  function submite(data) {
    api.post("/login",data).then(res=>{
      navigate("/principal")
    }).catch(e=>{
          toast.error(e)
    })
  }


  return (
    <>
      <div className="flex h-dvh w-dvw justify-center items-center">
        <div>
          <form onSubmit={handleSubmit(submite)} className='flex flex-col gap-2.5 min-w-70 md:w-100'>
            <div>


              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" {...register("email")} />
              {errors.email && <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>}
            </div>

            <div>


              <Label htmlFor="senha">Senha</Label>
              <Input type="password" id="senha" placeholder="Senha" {...register("senha")} />

              {errors.senha && <span className='text-red-500 text-sm'>
                {errors.senha.message}
              </span>}
            </div>
            <Button type="submit" className="mt-5 cursor-pointer">Iniciar</Button>

            <p className='text-center'>Ou</p>

            <Link to="/registrar">
              <Button className="cursor-pointer w-[100%]">Registrar</Button>
            </Link>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login
