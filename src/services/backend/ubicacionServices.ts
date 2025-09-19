
import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";
export async function registro_ubicacion(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO UBICACION (FK_PERSONA,FK_MUNICIPIO,BARRIO,DIRECCION) VALUES (?, ?,?,?)',
        [
            data.doc,
            data.municipio,
            data.barrio,
            data.direccion
        ]
    );
}
