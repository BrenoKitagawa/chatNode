import { DataTypes } from "sequelize";
import { database } from "../database/database.js";

export const HistoricoServico = database.define("historicoServico", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  trabalhoId: DataTypes.INTEGER,
  propostaId: DataTypes.INTEGER,

  clienteId: DataTypes.INTEGER,
  freelancerId: DataTypes.INTEGER,

  valorFinal: DataTypes.FLOAT,
  descricaoEntrega: DataTypes.TEXT,

  notaFreelancer: {
    type: DataTypes.INTEGER,
    allowNull: true // 1 a 5 estrelas
  },

  comentarioCliente: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});
