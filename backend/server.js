import express from 'express'
import { database } from "./database/database.js"
import { Usuario } from './models/Usuario.js';
import routes from './Routes.js';
import cors from "cors";

const app =express()

//await Usuario.sync();
app.use(express.json());
app.use(cors());
app.use(routes)


try{
    await database.authenticate();
  console.log('Banco conecatado com sucesso');
}catch(e){
    console.log(e)
}

app.listen(3000,()=>{
    console.log("servidor rodando na porta 3000")
})
