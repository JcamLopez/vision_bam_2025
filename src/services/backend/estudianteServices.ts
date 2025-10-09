

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";

export async function RegistroEstudiante(data: usuarioPayload, connection: PoolConnection) {


    await connection.execute(
        'INSERT INTO ESTUDIANTE (ID_PERSONA,ID_GRADO,FECHA_NACIMIENTO,ESTADO) VALUES (?,?, ?,?)',
        [
            data.doc,
            data.grado,
            '2025-05-05',
            1
        ]
    );


}