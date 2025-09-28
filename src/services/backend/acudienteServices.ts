import { db } from "@/libs/db";
import {acudientePayload} from '@/schemas/acudienteSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroAcudiente(data: acudientePayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registroacudiente(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }

}
    

 export async function registroacudiente (data: acudientePayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO ACUDIENTE(PARENTESCO, ESTADO) VALUES (?,?)',
        [
            data.acudiente,
            1,
        ]
    );
 }
