import { DataTypes } from "sequelize";
import { database } from "../database/database.js";

export const Proposta = database.define("proposta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  // ID do cliente que criou o serviço
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // ID do freelancer que enviou a proposta
  freelancerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  // ID do serviço relacionado
  trabalhoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status:{
        type: DataTypes.TEXT,
  }
});
