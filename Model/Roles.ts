import { Conexion } from "./conexion.ts";

export interface Rol {
    id_Rol?: number;
    Nombre: string;
}

export class Roles {
    public _rol: Rol | null;
    public _id: number | null;

    constructor(rol: Rol | null = null, id: number | null = null) {
        this._rol = rol;
        this._id = id;
    }

    public async obtenerTodos(): Promise<Rol[]> {
        const { rows: roles } = await Conexion.execute("SELECT * FROM roles");
        return roles as Rol[];
    }

    public async obtenerPorId(id: number): Promise<Rol> {
        const { rows } = await Conexion.execute("SELECT * FROM roles WHERE id_Rol = ?", [id]);
        const roles = rows as Rol[];
        return roles[0];
    }

    public async crear(): Promise<any> {
        if (!this._rol) {
            throw new Error("No hay datos de rol para registrar");
        }
        return await Conexion.execute("INSERT INTO roles (Nombre) VALUES (?)", [this._rol.Nombre]);
    }

    public async actualizar(id: number): Promise<any> {
        if (!this._rol) {
            throw new Error("No hay datos de rol para actualizar");
        }
        return await Conexion.execute("UPDATE roles SET Nombre = ? WHERE id_Rol = ?", [this._rol.Nombre, id]);
    }

    public async eliminar(id: number): Promise<any> {
        return await Conexion.execute("DELETE FROM roles WHERE id_Rol = ?", [id]);
    }
}