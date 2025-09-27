import { db } from "@/libs/db";
import {visionPayload} from '@/schemas/visionSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroVision(data: visionPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registrovision(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }



}


      
      

 export async function registrovision (data: visionPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO VISION(VISION, ESTADO) VALUES (?,?)',
        [
            data.vision,
            1,
        ]
    );
 }



