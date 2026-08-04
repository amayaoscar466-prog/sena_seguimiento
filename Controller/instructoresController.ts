import { RouterContext } from "../Dependencies/dependencias.ts";
import { Instructores } from "../Model/Instructores.ts";

export const getInstructores = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const obj = new Instructores();
    const lista = await obj.obtenerTodos();
    response.status = 200;
    response.body = { success: true, data: lista };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const getInstructorPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Instructores();
    const item = await obj.obtenerPorId(id);

    if (!item) {
      response.status = 404;
      response.body = { success: false, message: "Instructor no encontrado" };
      return;
    }

    response.status = 200;
    response.body = { success: true, data: item };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const postInstructores = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const obj = new Instructores(body);
    const resultado = await obj.crear();
    
    response.status = 201;
    response.body = { success: true, message: "Instructor creado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const putInstructores = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const obj = new Instructores(body);
    const resultado = await obj.actualizar(id);

    response.status = 200;
    response.body = { success: true, message: "Instructor actualizado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const deleteInstructores = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Instructores();
    const resultado = await obj.eliminar(id);

    response.status = 200;
    response.body = { success: true, message: "Instructor eliminado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};