import { db } from "@/libs/db";
import {permisoPayload} from '@/schemas/permisoSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroPermiso(data: permisoPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registropermiso(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

        
    }

}
    

 export async function registropermiso (data: permisoPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO PERMISO(PERMISO, ESTADO) VALUES (?,?)',
        [
            data.permiso,
            1,
        ]
    );
 }



