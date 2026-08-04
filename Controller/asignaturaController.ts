import { RouterContext } from "../Dependencies/dependencias.ts";
import { Asignaturas } from "../Model/Asignaturas.ts";

export const getAsignaturas = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const obj = new Asignaturas();
    const lista = await obj.obtenerTodas();
    response.status = 200;
    response.body = { success: true, data: lista };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const getAsignaturaPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Asignaturas();
    const item = await obj.obtenerPorId(id);

    if (!item) {
      response.status = 404;
      response.body = { success: false, message: "Asignatura no encontrada" };
      return;
    }

    response.status = 200;
    response.body = { success: true, data: item };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const postAsignaturas = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const obj = new Asignaturas(body);
    const resultado = await obj.crear();
    
    response.status = 201;
    response.body = { success: true, message: "Asignatura creada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const putAsignaturas = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const obj = new Asignaturas(body);
    const resultado = await obj.actualizar(id);

    response.status = 200;
    response.body = { success: true, message: "Asignatura actualizada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const deleteAsignaturas = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new Asignaturas();
    const resultado = await obj.eliminar(id);

    response.status = 200;
    response.body = { success: true, message: "Asignatura eliminada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};