import { Op } from "sequelize";
import { HistoricoServico } from "../models/HistoricoServico.js";

export default {

  async listar(req, res) {
    const userId = req.userId;

    const itens = await HistoricoServico.findAll({
      where: {
        [Op.or]: [
          { clienteId: userId },
          { freelancerId: userId }
        ]
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(itens);
  },

  async avaliar(req, res) {
    const { id } = req.params;
    const { nota, comentario } = req.body;
    const userId = req.userId;

    const item = await HistoricoServico.findByPk(id);

    if (!item) return res.status(404).json({ erro: "Histórico não encontrado" });

    if (item.clienteId !== userId) {
      return res.status(403).json({ erro: "Somente o cliente pode avaliar" });
    }

    item.notaFreelancer = nota;
    item.comentarioCliente = comentario;

    await item.save();

    res.json({ mensagem: "Avaliação enviada" });
  }
};
