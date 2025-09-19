

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";
export async function registro_correo(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO CORREO (FK_PERSONA,CORREO,ESTADO) VALUES (?, ?, ?)',
        [
            data.doc,
            data.email,
            1
        ]
    );
}