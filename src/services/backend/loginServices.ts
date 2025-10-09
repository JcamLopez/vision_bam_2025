
import { db } from "@/libs/db";
import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
import { loginPayload } from '@/schemas/loginSchema'


export async function iniciarSesion(data: loginPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const usuario = await consultarUsuario(data, connection);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const coincide = await bcrypt.compare(data.clave, usuario.clave);

        if (!coincide) {
            throw new Error("Contraseña incorrecta");
        }

        await connection.commit();

        return {
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                usuario: usuario.usuario,
                estado: usuario.estado,
            },
        };
    } catch (error: any) {
        await connection.rollback();
        console.error("Error en iniciarSesion:", error);
        return {
            mensaje: "Error en login",
            usuario: null,
            error: error.message
        }
        /* throw new Error("Error al iniciar sesión: " + error.message); */
    } finally {
        connection.release();
    }
}
const consultarUsuario = async (
    data: loginPayload,
    connection: PoolConnection
) => {
    try {
        const [rows] = await connection.query(
            'SELECT U.ID_USUARIO AS id, U.USUARIO AS usuario, U.CLAVE AS clave,  U.ESTADO AS estado FROM USUARIO AS U  WHERE U.USUARIO = ? AND U.ESTADO = ?',
            [data.usuario, 1]
        );

        const usuario = (rows as any[])[0];

        return usuario || null;
    } catch (error) {
        console.error("Error al consultar el usuario:", error);
        throw new Error("No se pudo consultar el usuario");
    }
};

