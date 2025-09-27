import { db } from "@/libs/db";
import {materiaPayload} from '@/schemas/materiaSchema'
import { PoolConnection } from "mysql2/promise";
export async function registroMateria(data: materiaPayload,) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
  
      
        await registromateria (data, connection)
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


async function registromateria(data: materiaPayload, connection: PoolConnection) {
  


    await connection.execute(
        'INSERT INTO MATERIA(NOMBRE) VALUES (?)',
        [
            data.materia,
            1
        ]
    );
}