import { db } from "@/libs/db";
import {historiaPayload} from '@/schemas/historiaSchema'
import { PoolConnection } from "mysql2/promise";


export async function registrohistoria(data: historiaPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registroHistoria(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }



}


      
      

 export async function registroHistoria (data: historiaPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO HISTORIA(HISTORIA, ESTADO) VALUES (?,?)',
        [
            data.historia,
            1,
        ]
    );
 }

