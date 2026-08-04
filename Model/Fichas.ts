import { Conexion } from "./conexion.ts";

export interface Ficha {
  id_Ficha?: number;
  Numero_Ficha: string;
  id_Programa: number;
}

export class Fichas {
  public _ficha: Ficha | null;
  public _id: number | null;

  constructor(ficha: Ficha | null = null, id: number | null = null) {
    this._ficha = ficha;
    this._id = id;
  }

  public async obtenerTodas(): Promise<Ficha[]> {
    const { rows: fichas } = await Conexion.execute("SELECT * FROM fichas");
    return fichas as Ficha[];
  }

  public async obtenerPorId(id: number): Promise<Ficha> {
    const { rows } = await Conexion.execute("SELECT * FROM fichas WHERE id_Ficha = ?", [id]);
    const fichas = rows as Ficha[];
    return fichas[0];
  }

  public async crear(): Promise<any> {
    if (!this._ficha) {
      throw new Error("No hay datos de ficha para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO fichas (Numero_Ficha, id_Programa) VALUES (?, ?)",
      [this._ficha.Numero_Ficha, this._ficha.id_Programa]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._ficha) {
      throw new Error("No hay datos de ficha para actualizar");
    }
    return await Conexion.execute(
      "UPDATE fichas SET Numero_Ficha = ?, id_Programa = ? WHERE id_Ficha = ?",
      [this._ficha.Numero_Ficha, this._ficha.id_Programa, id]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM fichas WHERE id_Ficha = ?", [id]);
  }
}