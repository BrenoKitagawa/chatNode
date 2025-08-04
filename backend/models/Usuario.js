import { DataTypes } from "sequelize";
import { database } from "../database/database.js";

export const Usuario = database.define("usuario",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },senha:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


