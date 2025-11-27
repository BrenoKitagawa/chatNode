
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { database } from "./database/database.js";
import { Usuario } from "./models/Usuario.js";
import { Proposta } from "./models/Proposta.js";
import { Servico } from "./models/Servico.js";

import routes from "./Routes.js";
import cors from "cors";
import { Mensagem } from "./models/Mensagem.js";
import { HistoricoServico } from "./models/HistoricoServico.js";

const app = express();



//await Usuario.sync();
//await Proposta.sync();
//await Servico.sync()
//await Mensagem.sync()
//await HistoricoServico.sync();




// Criar servidor HTTP para o Socket
const server = createServer(app);

// Criar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Configurações básicas
app.use(cors());
app.use(express.json());
app.use(routes);

// ============================
//       SOCKET.IO
// ============================

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  // Entrar em sala específica (da proposta)
  socket.on("entrar_sala", (propostaId) => {
    socket.join(`sala_${propostaId}`);
    console.log(`Socket ${socket.id} entrou na sala ${propostaId}`);
  });

  // Enviar mensagem para sala
  socket.on("enviar_mensagem", (msg) => {
    console.log("Mensagem recebida no socket:", msg);

    // Enviar para todos da sala
    io.to(`sala_${msg.propostaId}`).emit("nova_mensagem", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuário saiu:", socket.id);
  });
});

// ============================
//       BANCO DE DADOS
// ============================

try {
  await database.authenticate();
  console.log("Banco conectado com sucesso");
} catch (e) {
  console.log("Erro ao conectar no banco:", e);
}

// ============================
//       INICIAR SERVIDOR
// ============================

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 (com Socket.io)");
});
