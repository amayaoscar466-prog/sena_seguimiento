import { Conexion } from "./conexion.ts";

export interface InstructorAsig {
  id_Instructor_Asignatura?: number;
  id_Instructor: number;
  id_Asignatura: number;
}

export class InstructorAsigModel {
  public _instructorAsig: InstructorAsig | null;
  public _id: number | null;

  constructor(instructorAsig: InstructorAsig | null = null, id: number | null = null) {
    this._instructorAsig = instructorAsig;
    this._id = id;
  }

  public async obtenerTodas(): Promise<InstructorAsig[]> {
    const { rows: asignaciones } = await Conexion.execute("SELECT * FROM instructor_asignatura");
    return asignaciones as InstructorAsig[];
  }

  public async obtenerPorId(id: number): Promise<InstructorAsig> {
    const { rows } = await Conexion.execute("SELECT * FROM instructor_asignatura WHERE id_Instructor_Asignatura = ?", [id]);
    const asignaciones = rows as InstructorAsig[];
    return asignaciones[0];
  }

  public async crear(): Promise<any> {
    if (!this._instructorAsig) {
      throw new Error("No hay datos para registrar la asignación");
    }
    return await Conexion.execute(
      "INSERT INTO instructor_asignatura (id_Instructor, id_Asignatura) VALUES (?, ?)",
      [
        this._instructorAsig.id_Instructor,
        this._instructorAsig.id_Asignatura,
      ]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._instructorAsig) {
      throw new Error("No hay datos para actualizar la asignación");
    }
    return await Conexion.execute(
      "UPDATE instructor_asignatura SET id_Instructor = ?, id_Asignatura = ? WHERE id_Instructor_Asignatura = ?",
      [
        this._instructorAsig.id_Instructor,
        this._instructorAsig.id_Asignatura,
        id,
      ]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM instructor_asignatura WHERE id_Instructor_Asignatura = ?", [id]);
  }
}