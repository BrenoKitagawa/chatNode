import express from "express"
import UsuarioController from "./controller/UsuarioController.js";
import { PropostaController } from "./controller/PropostaController.js";
import { autenticar } from "./middleware/auth.js";
import ServicoController from "./controller/ServicoController.js";
import ChatController from "./controller/ChatController.js";
import HistoricoController from "./controller/HistoricoController.js";
const routes = express.Router()



routes.get("/propostas/aceitas", autenticar, PropostaController.listarAceitas);
routes.patch("/propostas/:id/finalizar", autenticar, PropostaController.finalizar);
routes.post("/propostas", PropostaController.criar);
routes.get("/propostas", PropostaController.listar);
routes.get("/propostas/:id", PropostaController.buscarPorId);
routes.put("/propostas/:id", PropostaController.atualizar);
routes.delete("/propostas/:id", PropostaController.deletar);
routes.get("/propostas/:id", PropostaController.detalhes);
routes.get("/propostas/:id/recebidas", PropostaController.propostasRecebidas);
routes.get("/propostas/:id/minhas", autenticar, PropostaController.minhasPropostas);
routes.post("/propostas/enviar", autenticar, PropostaController.enviar);

routes.get("/usuarios", UsuarioController.findAll);
routes.get("/usuarios/:id", UsuarioController.findOne);
routes.post("/usuarios", UsuarioController.create);
routes.put("/usuarios/:id", UsuarioController.update);
routes.delete("/usuarios/:id", UsuarioController.delete);
routes.post("/login", UsuarioController.login);

routes.get("/me", autenticar, UsuarioController.me);

routes.post("/servicos", autenticar, ServicoController.criar);
routes.get("/servicos", ServicoController.listar);
routes.get("/servicos/:id", ServicoController.buscar);
routes.delete("/servicos/:id",autenticar , ServicoController.deletar);


routes.get("/conversas", autenticar, ChatController.listarConversas);

routes.get("/chat/:propostaId", autenticar, ChatController.listar);

routes.post("/chat/enviar", autenticar, ChatController.enviar);

routes.get("/conversas", autenticar, ChatController.listarConversas);
routes.post("/propostas/:propostaId/aceitar", autenticar, PropostaController.aceitar);


routes.get("/historico/finalizados", autenticar, HistoricoController.listar);
routes.patch("/historico/avaliar/:id", autenticar, HistoricoController.avaliar);


export default routes;