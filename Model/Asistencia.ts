import { Conexion } from "./conexion.ts";

export interface AsistenciaItem {
  id_Asistencia?: number;
  id_Aprendiz: number;
  id_Asignatura: number;
  Fecha: string;
  Estado: string;
}

export class Asistencia {
  public _asistencia: AsistenciaItem | null;
  public _id: number | null;

  constructor(asistencia: AsistenciaItem | null = null, id: number | null = null) {
    this._asistencia = asistencia;
    this._id = id;
  }

  public async obtenerTodas(): Promise<AsistenciaItem[]> {
    const { rows: asistencias } = await Conexion.execute("SELECT * FROM asistencia");
    return asistencias as AsistenciaItem[];
  }

  public async obtenerPorId(id: number): Promise<AsistenciaItem> {
    const { rows } = await Conexion.execute("SELECT * FROM asistencia WHERE id_Asistencia = ?", [id]);
    const asistencias = rows as AsistenciaItem[];
    return asistencias[0];
  }

  public async crear(): Promise<any> {
    if (!this._asistencia) {
      throw new Error("No hay datos de asistencia para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO asistencia (id_Aprendiz, id_Asignatura, Fecha, Estado) VALUES (?, ?, ?, ?)",
      [
        this._asistencia.id_Aprendiz,
        this._asistencia.id_Asignatura,
        this._asistencia.Fecha,
        this._asistencia.Estado,
      ]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._asistencia) {
      throw new Error("No hay datos de asistencia para actualizar");
    }
    return await Conexion.execute(
      "UPDATE asistencia SET id_Aprendiz = ?, id_Asignatura = ?, Fecha = ?, Estado = ? WHERE id_Asistencia = ?",
      [
        this._asistencia.id_Aprendiz,
        this._asistencia.id_Asignatura,
        this._asistencia.Fecha,
        this._asistencia.Estado,
        id,
      ]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM asistencia WHERE id_Asistencia = ?", [id]);
  }
}