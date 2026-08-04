import { Conexion } from "./conexion.ts";

export interface Instructor {
  id_Instructor?: number;
  Nombre: string;
  Apellido: string;
  Correo: string;
  id_Usuario: number;
}

export class Instructores {
  public _instructor: Instructor | null;
  public _id: number | null;

  constructor(instructor: Instructor | null = null, id: number | null = null) {
    this._instructor = instructor;
    this._id = id;
  }

  public async obtenerTodos(): Promise<Instructor[]> {
    const { rows: instructores } = await Conexion.execute("SELECT * FROM instructores");
    return instructores as Instructor[];
  }

  public async obtenerPorId(id: number): Promise<Instructor> {
    const { rows } = await Conexion.execute("SELECT * FROM instructores WHERE id_Instructor = ?", [id]);
    const instructores = rows as Instructor[];
    return instructores[0];
  }

  public async crear(): Promise<any> {
    if (!this._instructor) {
      throw new Error("No hay datos de instructor para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO instructores (Nombre, Apellido, Correo, id_Usuario) VALUES (?, ?, ?, ?)",
      [
        this._instructor.Nombre,
        this._instructor.Apellido,
        this._instructor.Correo,
        this._instructor.id_Usuario,
      ]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._instructor) {
      throw new Error("No hay datos de instructor para actualizar");
    }
    return await Conexion.execute(
      "UPDATE instructores SET Nombre = ?, Apellido = ?, Correo = ?, id_Usuario = ? WHERE id_Instructor = ?",
      [
        this._instructor.Nombre,
        this._instructor.Apellido,
        this._instructor.Correo,
        this._instructor.id_Usuario,
        id,
      ]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM instructores WHERE id_Instructor = ?", [id]);
  }
}