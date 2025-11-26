import React from 'react'
import {BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from '../paginas/login/Index'
import NotFound from '../paginas/notFound/Index'
import { ModeToggle } from '../components/ui/modeToggle'
import Registrar from '../paginas/registrar/Index'
import { ToastContainer } from 'react-toastify'
import Prinipal from '../paginas/principal/Index'
import TrabalhoDetalhes from '../paginas/trabalho/TrabalhoDetalhes'
import AppLayout from '../layout/AppLayout'
import Chat from '../paginas/chat/Chat'
import Conversas from '../paginas/conversas/Conversas'

const Rotas = () => {
  return (
<BrowserRouter>
  <ModeToggle />
  <ToastContainer />

  <Routes>
    {/* SEM HEADER */}
    <Route path="/" element={<Login />} />
    <Route path="/registrar" element={<Registrar />} />

    {/* COM HEADER */}
    <Route element={<AppLayout />}>
      <Route path="/principal" element={<Prinipal />} />
      <Route path="/servico/:id" element={<TrabalhoDetalhes />} />
      <Route path="/chat/:propostaId" element={<Chat />} />
<Route path="/conversas" element={<Conversas />} />

    </Route>

    {/* Not Found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

  )
}

export default Rotas
