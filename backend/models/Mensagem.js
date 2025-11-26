import { DataTypes } from "sequelize";
import { database } from "../database/database.js";

export const Mensagem = database.define("mensagem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  propostaId: { type: DataTypes.INTEGER, allowNull: false },

  remetenteId: { type: DataTypes.INTEGER, allowNull: false }, // usuário que enviou
  texto: { type: DataTypes.TEXT, allowNull: false },

  lida: { type: DataTypes.BOOLEAN, defaultValue: false }
});
