import { db } from "@/libs/db";
import {horarioPayload} from '@/schemas/horarioSchema'
import { PoolConnection } from "mysql2/promise";


export async function registroHorario(data: horarioPayload) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
   
 

        await registrohorario(data, connection);
     
        await connection.commit();
        return { mensaje: "Registro exitoso" };
    } catch (error: any) {

          return { mensaje: "error " , error };
    }

}
    

 export async function registrohorario (data: horarioPayload, connection: PoolConnection){

     await connection.execute(
        'INSERT INTO DOCENTE_DICTA_MATERIA(ID_DOCENTE, ID_MATERIA, DIA, HORA_INICIO, HORA_FINAL, ESTADO) VALUES (?,?,?,?,?,?)',
        [
           
            data.id_docente,
            data.id_materia,
            data.dia,
            data.hora_inicio,
            data.hora_fin,
            1,
         
        ]
    );
 }
