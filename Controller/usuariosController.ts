import { RouterContext } from "../Dependencies/dependencias.ts";
import { Usuarios } from "../Model/Usuarios.ts";

export const getUsuarios = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const objUsuarios = new Usuarios();
    const listaUsuarios = await objUsuarios.obtenerTodos();
    response.status = 200;
    response.body = {
      success: true,
      data: listaUsuarios,
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

export const getUsuarioPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const objUsuarios = new Usuarios();
    const usuario = await objUsuarios.obtenerPorId(id);

    if (!usuario) {
      response.status = 404;
      response.body = {
        success: false,
        message: "Usuario no encontrado",
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: usuario,
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

export const postUsuarios = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const objUsuarios = new Usuarios(body);
    const resultado = await objUsuarios.crear();

    response.status = 201;
    response.body = {
      success: true,
      message: "Usuario creado exitosamente",
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

export const putUsuarios = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const objUsuarios = new Usuarios(body);
    const resultado = await objUsuarios.actualizar(id);

    response.status = 200;
    response.body = {
      success: true,
      message: "Usuario actualizado exitosamente",
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

export const deleteUsuarios = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const objUsuarios = new Usuarios();
    const resultado = await objUsuarios.eliminar(id);

    response.status = 200;
    response.body = {
      success: true,
      message: "Usuario eliminado exitosamente",
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
