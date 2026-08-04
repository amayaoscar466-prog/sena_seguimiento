import { RouterContext } from "../Dependencies/dependencias.ts";
import { Programas } from "../Model/Programas.ts";

export const getProgramas = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const obj = new Programas();
    const lista = await obj.obtenerTodos();
    response.status = 200;
    response.body = { success: true, data: lista };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const getProgramaPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Programas();
    const item = await obj.obtenerPorId(id);

    if (!item) {
      response.status = 404;
      response.body = { success: false, message: "Programa no encontrado" };
      return;
    }

    response.status = 200;
    response.body = { success: true, data: item };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const postProgramas = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const obj = new Programas(body);
    const resultado = await obj.crear();
    
    response.status = 201;
    response.body = { success: true, message: "Programa creado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const putProgramas = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const obj = new Programas(body);
    const resultado = await obj.actualizar(id);

    response.status = 200;
    response.body = { success: true, message: "Programa actualizado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const deleteProgramas = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Programas();
    const resultado = await obj.eliminar(id);

    response.status = 200;
    response.body = { success: true, message: "Programa eliminado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};