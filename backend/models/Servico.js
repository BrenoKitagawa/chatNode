import { DataTypes } from "sequelize";
import { database } from "../database/database.js";

export const Servico = database.define("servico", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },

  valor: {
    type: DataTypes.FLOAT,
    allowNull: true
  },

  // usuário que criou o serviço
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
