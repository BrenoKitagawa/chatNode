import express from "express"
import UsuarioController from "./controller/UsuarioController.js";
import AuthController from "./controller/AuthController.js";
const routes = express.Router()

routes.get("/usuarios",UsuarioController.findAll)
routes.post("/usuarios",UsuarioController.create)
routes.post("/login",AuthController.login)



export default routes;