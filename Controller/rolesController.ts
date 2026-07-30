import { RouterContext } from "../Dependencies/dependencias.ts";
import { Roles } from "../Model/Roles.ts";

export const getRoles = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const objRoles = new Roles();
    const listaRol = await objRoles.obtenerTodos();
    response.status = 200;
    response.body = {
      success: true,
      data: listaRol,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Error al procesar la solicitud",
      errors: String(error),
    };
  }
};

export const getRolPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const objRoles = new Roles();
    const rol = await objRoles.obtenerPorId(id);

    if (!rol) {
      response.status = 404;
      response.body = {
        success: false,
        message: "Rol no encontrado",
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: rol,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Error al procesar la solicitud",
      errors: String(error),
    };
  }
};

export const postRoles = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    // Aseguramos la lectura correcta del body en JSON con Oak
    const body = await request.body.json();
    const objRoles = new Roles(body);
    const resultado = await objRoles.crear();
    
    response.status = 201;
    response.body = {
      success: true,
      message: "Rol creado exitosamente",
      data: resultado,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Error al procesar la solicitud",
      errors: String(error),
    };
  }
};

export const putRoles = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const objRoles = new Roles(body);
    const resultado = await objRoles.actualizar(id);

    response.status = 200;
    response.body = {
      success: true,
      message: "Rol actualizado exitosamente",
      data: resultado,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Error al procesar la solicitud",
      errors: String(error),
    };
  }
};

export const deletetRoles = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const objRoles = new Roles();
    const resultado = await objRoles.eliminar(id);

    response.status = 200;
    response.body = {
      success: true,
      message: "Rol eliminado exitosamente",
      data: resultado,
    };
  } catch (error) {
    response.status = 400;
    response.body = {
      success: false,
      message: "Error al procesar la solicitud",
      errors: String(error),
    };
  }
};