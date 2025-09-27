import { db } from "@/libs/db";
import {misionPayload} from '@/schemas/misionSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroMision(data: misionPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registromision(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }



}


      
      

 export async function registromision (data: misionPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO MISION(MISION, ESTADO) VALUES (?,?)',
        [
            data.mision,
            1,
        ]
    );
 }



