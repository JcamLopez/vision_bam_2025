import { db } from "@/libs/db";
import {publicacionPayload} from '@/schemas/publicacionSchema'
import { PoolConnection } from "mysql2/promise";

export async function registroPublicacion(data: publicacionPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        await registropublicacion(data, connection);
        await connection.commit();

        return { mensaje: "Registro exitoso" };
    } catch (error: any) {
        await connection.rollback(); // 🔁 Revertir si algo falla
        throw new Error('Error al registrar la publicación: ' + error.message);
    } finally {
        connection.release(); // 🔓 Liberar la conexión SIEMPRE
    }
}


      
      

 export async function registropublicacion (data: publicacionPayload, connection: PoolConnection){

    await connection.execute(
    'INSERT INTO PUBLICACION(TITULO, FECHA, ESTADO) VALUES (?, ?, ?)',
    [
        data.publicacion,                   // TITULO
        new Date().toISOString().split('T')[0],  // FECHA en formato 'YYYY-MM-DD'
        1                            // ESTADO (ajústalo según tu modelo)
    ]
);
 }