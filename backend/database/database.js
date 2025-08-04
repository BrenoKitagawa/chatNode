import { Sequelize } from "sequelize"

export const database = new Sequelize("chatNode","root","1234",{
    host:"localhost",
    dialect:"mysql"
})