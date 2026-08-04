import { RouterContext } from "../Dependencies/dependencias.ts";
import { InstructorAsigModel } from "../Model/Instructor_Asig.ts";

export const getInstructorAsig = async (ctx: RouterContext<string>) => {
  const { response } = ctx;
  try {
    const obj = new InstructorAsigModel();
    const lista = await obj.obtenerTodas();
    response.status = 200;
    response.body = { success: true, data: lista };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const getInstructorAsigPorId = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new InstructorAsigModel();
    const item = await obj.obtenerPorId(id);

    if (!item) {
      response.status = 404;
      response.body = { success: false, message: "Asignación no encontrada" };
      return;
    }

    response.status = 200;
    response.body = { success: true, data: item };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const postInstructorAsig = async (ctx: RouterContext<string>) => {
  const { response, request } = ctx;
  try {
    const body = await request.body.json();
    const obj = new InstructorAsigModel(body);
    const resultado = await obj.crear();
    
    response.status = 201;
    response.body = { success: true, message: "Asignación creada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const putInstructorAsig = async (ctx: RouterContext<string>) => {
  const { response, request, params } = ctx;
  try {
    const id = Number(params?.id);
    const body = await request.body.json();
    const obj = new InstructorAsigModel(body);
    const resultado = await obj.actualizar(id);

    response.status = 200;
    response.body = { success: true, message: "Asignación actualizada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};

export const deleteInstructorAsig = async (ctx: RouterContext<string>) => {
  const { response, params } = ctx;
  try {
    const id = Number(params?.id);
    const obj = new InstructorAsigModel();
    const resultado = await obj.eliminar(id);

    response.status = 200;
    response.body = { success: true, message: "Asignación eliminada exitosamente", data: resultado };
  } catch (error) {
    response.status = 400;
    response.body = { success: false, message: "Error al procesar la solicitud", errors: String(error) };
  }
};