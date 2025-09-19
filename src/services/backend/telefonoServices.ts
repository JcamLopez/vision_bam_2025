

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";
export async function registro_telefono(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO TELEFONO (FK_PERSONA,NUMERO) VALUES (?, ?)',
        [
            data.doc,
            data.tel
        ]
    );
}