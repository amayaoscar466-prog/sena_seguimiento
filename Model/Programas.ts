import { Conexion } from "./conexion.ts";

export interface Programa {
  id_Programa?: number;
  Nombre_programa: string;
  Jornada: string;
}

export class Programas {
  public _programa: Programa | null;
  public _id: number | null;

  constructor(programa: Programa | null = null, id: number | null = null) {
    this._programa = programa;
    this._id = id;
  }

  public async obtenerTodos(): Promise<Programa[]> {
    const { rows: programas } = await Conexion.execute("SELECT * FROM programas");
    return programas as Programa[];
  }

  public async obtenerPorId(id: number): Promise<Programa> {
    const { rows } = await Conexion.execute("SELECT * FROM programas WHERE id_Programa = ?", [id]);
    const programas = rows as Programa[];
    return programas[0];
  }

  public async crear(): Promise<any> {
    if (!this._programa) {
      throw new Error("No hay datos de programa para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO programas (Nombre_programa, Jornada) VALUES (?, ?)",
      [this._programa.Nombre_programa, this._programa.Jornada]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._programa) {
      throw new Error("No hay datos de programa para actualizar");
    }
    return await Conexion.execute(
      "UPDATE programas SET Nombre_programa = ?, Jornada = ? WHERE id_Programa = ?",
      [this._programa.Nombre_programa, this._programa.Jornada, id]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM programas WHERE id_Programa = ?", [id]);
  }
}