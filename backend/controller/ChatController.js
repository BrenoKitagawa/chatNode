// backend/controller/ChatController.js
import { Mensagem } from "../models/Mensagem.js";
import { Proposta } from "../models/Proposta.js"; // <-- precisa existir corretamente
import { Op } from "sequelize";

export default {
  // listar mensagens de uma proposta (chat por proposta)
  async listar(req, res) {
    try {
      const { propostaId } = req.params;

      const mensagens = await Mensagem.findAll({
        where: { propostaId },
        order: [["id", "ASC"]],
      });

      return res.json(mensagens);
    } catch (e) {
      console.log("Erro listar mensagens:", e);
      return res.status(500).json({ erro: "Erro ao buscar mensagens" });
    }
  },

  // listar conversas (propostas) relacionadas ao usuário logado
  async listarConversas(req, res) {
    try {
      const userId = req.userId;

      // busca propostas onde usuário é freelancer OU cliente
      const propostas = await Proposta.findAll({
        where: {
          [Op.or]: [
            { freelancerId: userId },
            { clienteId: userId }
          ]
        }
      });

      const resultado = [];

      for (const p of propostas) {
        const ultimaMensagem = await Mensagem.findOne({
          where: { propostaId: p.id },
          order: [["createdAt", "DESC"]]
        });

        resultado.push({
          propostaId: p.id,
          trabalhoId: p.trabalhoId ?? null,
          clienteId: p.clienteId ?? null,
          freelancerId: p.freelancerId ?? null,
          ultimaMensagem: ultimaMensagem?.texto || null,
          horario: ultimaMensagem?.createdAt || p.createdAt
        });
      }

      return res.json(resultado);

    } catch (e) {
      console.log("Erro listarConversas:", e);
      res.status(500).json({ erro: "Erro ao listar conversas" });
    }
  },

  // enviar mensagem (salva no banco)
  async enviar(req, res) {
    try {
      const { propostaId, texto } = req.body;
      const remetenteId = req.userId;

      if (!propostaId || !texto) {
        return res.status(400).json({ erro: "propostaId e texto são obrigatórios" });
      }

      const mensagem = await Mensagem.create({
        propostaId,
        texto,
        remetenteId
      });

      return res.status(201).json(mensagem);
    } catch (e) {
      console.log("Erro enviar mensagem:", e);
      return res.status(500).json({ erro: "Erro ao enviar mensagem" });
    }
  }
};
