import { db } from "@/libs/db";
import {gradoPayload} from '@/schemas/gradoSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroGrado(data: gradoPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 
            await registrogrado(data, connection);
     
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

  
      
      

async function registrogrado(data: gradoPayload, connection: PoolConnection) {
  


    await connection.execute(
        'INSERT INTO GRADO(GRADO,ESTADO) VALUES (?,?)',
        [
            data.grado,
            1
        ]
    );
}
