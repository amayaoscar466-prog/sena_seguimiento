import { Router } from "../Dependencies/dependencias.ts";
import { getUsuarios, getUsuarioPorId, postUsuarios, putUsuarios, deleteUsuarios } from "../Controller/usuariosController.ts";

const usuariosRouter = new Router();

usuariosRouter
  .get("/usuarios", getUsuarios)
  .get("/usuarios/:id", getUsuarioPorId)
  .post("/usuarios", postUsuarios)
  .put("/usuarios/:id", putUsuarios)
  .delete("/usuarios/:id", deleteUsuarios);

export default usuariosRouter;