import { db } from "@/libs/db";
import {grupoPayload} from '@/schemas/grupoSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroGrupo(data: grupoPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 
        await registrogrupo(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }



}


      
      

 export async function registrogrupo (data: grupoPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO GRUPO(ESTADO, NOMBRE) VALUES (?,?)',
        [
            1,
            data.grupo,
        ]
    );
 }



