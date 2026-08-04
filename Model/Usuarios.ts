import { Conexion } from "./conexion.ts";

export interface Usuario {
  id?: number;
  password: string;
  id_Rol: number;
}

export class Usuarios {
  public _usuario: Usuario | null;
  public _id: number | null;

  constructor(usuario: Usuario | null = null, id: number | null = null) {
    this._usuario = usuario;
    this._id = id;
  }

  public async obtenerTodos(): Promise<Usuario[]> {
    const { rows: usuarios } = await Conexion.execute("SELECT * FROM usuarios");
    return usuarios as Usuario[];
  }

  public async obtenerPorId(id: number): Promise<Usuario> {
    const { rows } = await Conexion.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
    const usuarios = rows as Usuario[];
    return usuarios[0];
  }

  public async crear(): Promise<any> {
    if (!this._usuario) {
      throw new Error("No hay datos de usuario para registrar");
    }
    return await Conexion.execute(
      "INSERT INTO usuarios (password, id_Rol) VALUES (?, ?)",
      [this._usuario.password, this._usuario.id_Rol]
    );
  }

  public async actualizar(id: number): Promise<any> {
    if (!this._usuario) {
      throw new Error("No hay datos de usuario para actualizar");
    }
    return await Conexion.execute(
      "UPDATE usuarios SET password = ?, id_Rol = ? WHERE id = ?",
      [this._usuario.password, this._usuario.id_Rol, id]
    );
  }

  public async eliminar(id: number): Promise<any> {
    return await Conexion.execute("DELETE FROM usuarios WHERE id = ?", [id]);
  }
}