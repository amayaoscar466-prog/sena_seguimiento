import { Conexion } from "./conexion.ts";

export interface Aprendiz {
  id_Aprendiz?: number;
  Nombre: string;
  Apellido: string;
  Correo: string;
  id_Usuario: number;
  id_Ficha: number;
}

export class Aprendices {
  public _aprendiz: Aprendiz | null;
  public _id: number | null;

  constructor(aprendiz: Aprendiz | null = null, id: number | null = null) {
    this._aprendiz = aprendiz;
    this._id = id;
  }

  public async obtenerTodos(): Promise<Aprendiz[]> {
    const { rows: aprendices } = await Conexion.execute("SELECT * FROM aprendices");
    return aprendices as Aprendiz[];
  }

  public async obtenerPorId(id: number): Promise<Aprendiz> {
    const { rows } = await Conexion.execute("SELECT * FROM aprendices WHERE id_Aprendiz = ?", [id]);
    const aprendices = rows as Aprendiz[];
    return aprendices[0];
  }

  public async crear(): Promise<any> {
    if (!this._aprendiz) {
      throw new Error("No hay datos de aprendiz para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO aprendices (Nombre, Apellido, Correo, id_Usuario, id_Ficha) VALUES (?, ?, ?, ?, ?)",
      [
        this._aprendiz.Nombre,
        this._aprendiz.Apellido,
        this._aprendiz.Correo,
        this._aprendiz.id_Usuario,
        this._aprendiz.id_Ficha,
      ]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._aprendiz) {
      throw new Error("No hay datos de aprendiz para actualizar");
    }
    return await Conexion.execute(
      "UPDATE aprendices SET Nombre = ?, Apellido = ?, Correo = ?, id_Usuario = ?, id_Ficha = ? WHERE id_Aprendiz = ?",
      [
        this._aprendiz.Nombre,
        this._aprendiz.Apellido,
        this._aprendiz.Correo,
        this._aprendiz.id_Usuario,
        this._aprendiz.id_Ficha,
        id,
      ]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM aprendices WHERE id_Aprendiz = ?", [id]);
  }
}