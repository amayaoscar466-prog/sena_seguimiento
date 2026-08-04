import { RouterContext } from "../Dependencies/dependencias.ts";
import { Aprendices } from "../Model/Aprendices.ts";

export const getAprendices = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const obj = new Aprendices();
    const lista = await obj.obtenerTodos();
    response.status = 200;
    response.body = { success: true, data: lista };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const getAprendizPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Aprendices();
    const item = await obj.obtenerPorId(id);

    if (!item) {
      response.status = 404;
      response.body = { success: false, message: "Aprendiz no encontrado" };
      return;
    }

    response.status = 200;
    response.body = { success: true, data: item };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const postAprendices = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const obj = new Aprendices(body);
    const resultado = await obj.crear();
    
    response.status = 201;
    response.body = { success: true, message: "Aprendiz creado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const putAprendices = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const obj = new Aprendices(body);
    const resultado = await obj.actualizar(id);

    response.status = 200;
    response.body = { success: true, message: "Aprendiz actualizado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const deleteAprendices = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Aprendices();
    const resultado = await obj.eliminar(id);

    response.status = 200;
    response.body = { success: true, message: "Aprendiz eliminado exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};