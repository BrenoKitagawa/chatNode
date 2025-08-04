import React from 'react'
import {BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from '../paginas/login/Index'
import NotFound from '../paginas/notFound/Index'
import { ModeToggle } from '../components/ui/modeToggle'
import Registrar from '../paginas/registrar/Index'
import { ToastContainer } from 'react-toastify'
import Prinipal from '../paginas/principal/Index'

const Rotas = () => {
  return (
   <BrowserRouter>
   <ModeToggle/>
       <ToastContainer />
            <Routes>
                <Route path='/' element={<Login/>}/>
                 <Route path='/registrar' element={<Registrar/>}/>
                 <Route path='/principal' element={<Prinipal/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
   </BrowserRouter>
  )
}

export default Rotas
