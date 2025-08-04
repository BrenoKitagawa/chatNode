import { json } from "sequelize";
import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

const salt= 10
export default{

    async findAll(req,res){
        try{

            const usuario = await Usuario.findAll()
           return res.json(usuario)
            
        }catch(e){
            console.log(e)
            res.status(500).json({e:"Erro ao listar usuarios"})
        }
    },

    async create(req,res){

    const {email,senha,nome}= req.body
    try{

        const senhaCrypto= await  bcrypt.hash(senha,salt)

        const usuario = await Usuario.create({
            email,
            nome,
            senha:senhaCrypto
        })

        return res.status(200).json({usuario})

    }catch(e){
        console.log(e)
        res.status(500).json({e:"usuario nao cadastrado"})

    }
    },

}