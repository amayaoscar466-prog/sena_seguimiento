// Routes/roles.routes.ts
import { Router } from "../Dependencies/dependencias.ts";
import { getRoles, getRolPorId, postRoles, putRoles, deletetRoles  } from "../Controller/rolesController.ts";
 


const rolesRouter = new Router();

rolesRouter
   .get("/roles", getRoles)
   .get("/roles/:id", getRolPorId)
   .post("/roles", postRoles)
   .put("/roles/:id", putRoles)
   .delete("/roles/:id", deletetRoles);

export default rolesRouter;