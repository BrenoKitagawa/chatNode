import { Servico } from "../models/Servico.js";

export default {
  async criar(req, res) {
    try {
      const { titulo, descricao, categoria, valor } = req.body;
      const clienteId = req.userId; // <-- PEGA DO TOKEN

      if (!clienteId) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const servico = await Servico.create({
        titulo,
        descricao,
        categoria,
        valor,
        clienteId
      });

      return res.status(201).json(servico);

    } catch (e) {
      console.error(e);
      res.status(500).json({ erro: "Erro ao criar serviço" });
    }
  },

  async listar(req, res) {
    try {
      const servicos = await Servico.findAll();
      return res.json(servicos);

    } catch (e) {
      console.error(e);
      res.status(500).json({ erro: "Erro ao listar serviços" });
    }
  },

  async buscar(req, res) {
    try {
      const { id } = req.params;

      const servico = await Servico.findByPk(id);

      if (!servico) {
        return res.status(404).json({ erro: "Serviço não encontrado" });
      }

      return res.json(servico);

    } catch (e) {
      console.error(e);
      res.status(500).json({ erro: "Erro ao buscar serviço" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      await Servico.destroy({ where: { id } });

      return res.json({ mensagem: "Serviço deletado" });

    } catch (e) {
      console.error(e);
      res.status(500).json({ erro: "Erro ao deletar serviço" });
    }
  }
};
