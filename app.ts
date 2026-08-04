import { Application, oakCors, } from "./Dependencies/dependencias.ts";
import  RolesRouter  from "./Routes/RolesRouter.ts";
import UsuariosRouter from "./Routes/UsuarioRouter.ts";
import Rourouter from "./Routes/Rou.ts";


const app = new Application();

app.use(oakCors({
    origin:"*"
}));


const routes = [RolesRouter, UsuariosRouter, Rourouter];

routes.forEach(router =>{
    app.use(router.routes());
    app.use(router.allowedMethods());
})

console.log("Servidor funcionando por el puerto 8001");

app.listen({port:8001});