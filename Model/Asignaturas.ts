import { Conexion } from "./conexion.ts";

export interface Asignatura {
  id_Asignatura?: number;
  Nombre: string;
  id_Ficha: number;
}

export class Asignaturas {
  public _asignatura: Asignatura | null;
  public _id: number | null;

  constructor(asignatura: Asignatura | null = null, id: number | null = null) {
    this._asignatura = asignatura;
    this._id = id;
  }

  public async obtenerTodas(): Promise<Asignatura[]> {
    const { rows: asignaturas } = await Conexion.execute("SELECT * FROM asignaturas");
    return asignaturas as Asignatura[];
  }

  public async obtenerPorId(id: number): Promise<Asignatura> {
    const { rows } = await Conexion.execute("SELECT * FROM asignaturas WHERE id_Asignatura = ?", [id]);
    const asignaturas = rows as Asignatura[];
    return asignaturas[0];
  }

  public async crear(): Promise<any> {
    if (!this._asignatura) {
      throw new Error("No hay datos de asignatura para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO asignaturas (Nombre, id_Ficha) VALUES (?, ?)",
      [this._asignatura.Nombre, this._asignatura.id_Ficha]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._asignatura) {
      throw new Error("No hay datos de asignatura para actualizar");
    }
    return await Conexion.execute(
      "UPDATE asignaturas SET Nombre = ?, id_Ficha = ? WHERE id_Asignatura = ?",
      [this._asignatura.Nombre, this._asignatura.id_Ficha, id]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM asignaturas WHERE id_Asignatura = ?", [id]);
  }
}