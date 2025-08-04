import sign from "jwt-encode"
import { Usuario } from "../models/Usuario.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv/config.js";


export default{
      async login(req,res){
        const {email, senha} = req.body

        try{
            const usuario =await Usuario.findOne({
                where:{email}
            })

            if(!usuario){
                return res.status(400).json({e:"Email ou senha incorreto"})
            }
            const senhaCorreta =await bcrypt.compare(senha,usuario.senha)
            if(!senhaCorreta){
              return res.status(400).json({e:"senha incorreto"})
            }
           const token = jwt.sign(
            {id:usuario.id, email:usuario.email , nome :usuario.nome},process.env.JWT_SECRET,{
                expiresIn:"2h",
                algorithm: 'HS256' 
            }
           )
            
        return res.status(200).json({token});

        }catch(e){
            res.status(500).json({e:"Usuario ou senha incorreto"})
        }
    }
}