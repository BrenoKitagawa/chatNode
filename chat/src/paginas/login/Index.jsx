import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify"
import api from '../../services/api'

const schema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(5, "Senha muito curta"),
})

const Login = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  async function submite(data) {
    try {
      const resposta = await api.post("/login", data)

      // Pegando token do backend
      const token = resposta.data.token

      // Salvando token no localStorage
      localStorage.setItem("token", token)

      toast.success("Login realizado!")

      // Redirecionar
      navigate("/principal")

    } catch (e) {
      console.log(e);

      const mensagem =
        e.response?.data?.erro ||
        "Erro ao fazer login"

      toast.error(mensagem)
    }
  }

  return (
    <div className="flex h-dvh w-dvw justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(submite)} className="flex flex-col gap-2.5 min-w-70 md:w-100">

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input type="password" id="senha" placeholder="Senha" {...register("senha")} />
            {errors.senha && (
              <span className="text-red-500 text-sm">{errors.senha.message}</span>
            )}
          </div>

          <Button type="submit" className="mt-5 cursor-pointer">Iniciar</Button>

          <p className="text-center">Ou</p>

          <Link to="/registrar">
            <Button className="cursor-pointer w-full">Registrar</Button>
          </Link>

        </form>
      </div>
    </div>
  )
}

export default Login
