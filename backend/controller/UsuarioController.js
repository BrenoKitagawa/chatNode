import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = "minha_chave_super_secreta_987654";
const saltRounds = 10;

export default {
  // ---------------------
  // LISTAR TODOS
  // ---------------------
  async findAll(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ["id", "nome", "email"], // nunca enviar senha
      });

      return res.json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ erro: "Erro ao listar usuários" });
    }
  },

  // ---------------------
  // BUSCAR POR ID
  // ---------------------
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id, {
        attributes: ["id", "nome", "email"],
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  },

  // ---------------------
  // CRIAR USUÁRIO
  // ---------------------
  async create(req, res) {
    const { email, senha, nome } = req.body;

    try {
      if (!email || !senha || !nome) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatórios não enviados" });
      }

      const emailExistente = await Usuario.findOne({ where: { email } });

      if (emailExistente) {
        return res.status(400).json({ erro: "E-mail já cadastrado" });
      }

      const senhaHash = await bcrypt.hash(senha, saltRounds);

      const usuario = await Usuario.create({
        email,
        nome,
        senha: senhaHash,
      });

      return res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ erro: "Erro ao criar usuário" });
    }
  },

  // ---------------------
  // ATUALIZAR USUÁRIO
  // ---------------------
  async update(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      // Evitar email duplicado
      if (email && email !== usuario.email) {
        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente) {
          return res.status(400).json({ erro: "E-mail já está em uso" });
        }
      }

      let senhaHash = usuario.senha;

      if (senha) {
        senhaHash = await bcrypt.hash(senha, saltRounds);
      }

      await usuario.update({
        nome: nome ?? usuario.nome,
        email: email ?? usuario.email,
        senha: senhaHash,
      });

      return res.json({
        mensagem: "Usuário atualizado com sucesso",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  },

  async me(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.userId, {
      attributes: ["id", "nome", "email"]
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    return res.json(usuario);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar usuário logado" });
  }
},

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      // verificar campos
      if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha obrigatórios" });
      }

      // buscar usuário
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      // comparar senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ erro: "Senha incorreta" });
      }

      // gerar token
   const token = jwt.sign(
  { id: usuario.id },
  SECRET,
  { expiresIn: "1d" }
);

      // retornar sem senha
      return res.json({
        mensagem: "Login efetuado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });

    } catch (error) {
      console.error("Erro ao logar:", error);
      return res.status(500).json({ erro: "Erro ao fazer login" });
    }
  },
  // ---------------------
  // DELETAR USUÁRIO
  // ---------------------
  async delete(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      await usuario.destroy();

      return res.json({ mensagem: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
  },
};
