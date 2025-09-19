import { db } from "@/libs/db";
import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
import { usuarioPayload } from '@/schemas/usuarioSchema'
import { obtenerRolPorNombre } from './rolServices'
import { reigstro_persona } from './personaServices'
import { registro_correo } from './correoServices'
import { registro_telefono } from './telefonoServices'
import { registro_ubicacion } from './ubicacionServices'
import { RegistroDocente } from './docenteServices'


export async function registrarUsuario(data: usuarioPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        await reigstro_persona(data, connection);
        await registro_correo(data, connection);
        await registro_telefono(data, connection);
        await registro_ubicacion(data, connection);
        await usuario(data, connection);
        if (data.rol === "DOCENTE") {
            RegistroDocente(data, connection)
        }
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {
        await connection.rollback();
        if (error.code === "ER_DUP_ENTRY") {
            throw new Error("El documento o usuario ya existe");
        }
        throw new Error("Error al registrar: " + error.message);
    } finally {
        connection.release();
    }
}


async function usuario(data: usuarioPayload, connection: PoolConnection) {
    const resultado = await obtenerRolPorNombre(data.rol)
    const id_rol = resultado.id
    const hash = await bcrypt.hash(data.clave, 12);
    await connection.execute(
        'INSERT INTO USUARIO (FK_PERSONA,FK_ROL,USUARIO,CLAVE,ESTADO) VALUES (?, ?,?,?,?)',
        [
            data.doc,
            id_rol,
            data.doc,
            hash,
            1
        ]
    );
}