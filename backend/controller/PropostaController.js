import { Proposta } from "../models/Proposta.js";
import { Servico } from "../models/Servico.js";

export const PropostaController = {
  
  // Criar nova proposta
  async criar(req, res) {
    try {
      const { titulo, descricao, valor, clienteId, categoria } = req.body;

      if (!titulo || !descricao || !valor || !clienteId) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
      }

      const proposta = await Proposta.create({
        titulo,
        descricao,
        valor,
        clienteId,
        categoria,
      });

      return res.status(201).json(proposta);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao criar proposta: " + error.message });
    }
  },

  // Listar todas
  async listar(req, res) {
    try {
      const propostas = await Proposta.findAll();
      return res.json(propostas);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar propostas: " + error.message });
    }
  },

   async detalhes(req, res) {
    try {
      const { id } = req.params;

      const trabalho = await Proposta.findByPk(id);

      if (!trabalho) {
        return res.status(404).json({ erro: "Trabalho não encontrado" });
      }

      return res.json(trabalho);
    } catch (e) {
      console.log(e);
      res.status(500).json({ erro: "Erro ao carregar trabalho" });
    }
  },
  async aceitar(req, res) {
  try {
    const { propostaId } = req.params;
    const userId = req.userId;

    const proposta = await Proposta.findByPk(propostaId);
    if (!proposta) {
      return res.status(404).json({ erro: "Proposta não encontrada" });
    }

    // cliente do serviço é quem pode aceitar
    if (proposta.clienteId !== userId) {
      return res.status(403).json({ erro: "Você não pode aceitar essa proposta" });
    }

    await proposta.update({ status: "aceita" });

    return res.json({ sucesso: true, mensagem: "Proposta aceita!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ erro: "Erro ao aceitar proposta" });
  }
},

  // -----------------------------
  // PROPOSTAS RECEBIDAS (DONO DO TRABALHO)
  // -----------------------------
  async propostasRecebidas(req, res) {
    try {
      const { id } = req.params;

      const propostas = await Proposta.findAll({
        where: { trabalhoId: id }
      });

      return res.json(propostas);

    } catch (e) {
      console.log(e);
      res.status(500).json({ erro: "Erro ao buscar propostas recebidas" });
    }
  },

  // -----------------------------
  // PROPOSTAS QUE O FREELANCER ENVIOU
  // -----------------------------
  async minhasPropostas(req, res) {
    try {
      const { id } = req.params;      // trabalhoId
      const userId = req.userId;      // vem do middleware

      const propostas = await Proposta.findAll({
        where: {
          trabalhoId: id,
          freelancerId: userId
        }
      });

      return res.json(propostas);

    } catch (e) {
      console.log(e);
      res.status(500).json({ erro: "Erro ao buscar suas propostas" });
    }
  },

  // -----------------------------
  // ENVIAR PROPOSTA
  // -----------------------------
async enviar(req, res) {
  try {
    const { trabalhoId, valor, descricao } = req.body;
    const freelancerId = req.userId;

    // 1 - Buscar o serviço para descobrir quem é o dono (clienteId)
    const servico = await Servico.findByPk(trabalhoId);

    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }

    const clienteId = servico.clienteId; // <-- pega o cliente certo

    // 2 - Criar a proposta
    const proposta = await Proposta.create({
      valor,
      descricao,
      trabalhoId,
      clienteId,
      freelancerId
    });

    return res.json(proposta);

  } catch (e) {
    console.log(e);
    return res.status(500).json({ erro: "Erro ao enviar proposta" });
  }
},

  // Buscar por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const proposta = await Proposta.findByPk(id);

      if (!proposta) {
        return res.status(404).json({ erro: "Proposta não encontrada" });
      }

      return res.json(proposta);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar proposta: " + error.message });
    }
  },

  // Atualizar
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const proposta = await Proposta.findByPk(id);

      if (!proposta) {
        return res.status(404).json({ erro: "Proposta não encontrada" });
      }

      await proposta.update(dados);

      return res.json(proposta);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao atualizar proposta: " + error.message });
    }
  },

  // Deletar
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const proposta = await Proposta.findByPk(id);

      if (!proposta) {
        return res.status(404).json({ erro: "Proposta não encontrada" });
      }

      await proposta.destroy();

      return res.json({ mensagem: "Proposta removida com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao deletar proposta: " + error.message });
    }
  },
};
