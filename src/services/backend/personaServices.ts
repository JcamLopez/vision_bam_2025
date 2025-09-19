
import { obtenerGeneroPorNombre } from './generoServices'
import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";
export async function reigstro_persona(data: usuarioPayload, connection: PoolConnection) {
    const resultado = await obtenerGeneroPorNombre(data.genero)
    const id_genero = resultado.id
    await connection.execute(
        'INSERT INTO PERSONA (DOCUMENTO, FK_TIPO_DOCUMENTO,FK_GENERO, N1, N2, AP1, AP2, ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
        [
            data.doc,
            data.tipo,
            id_genero,
            data.n1,
            data.n2 || null,
            data.ap1,
            data.ap2 || null,
            1
        ]
    );
}
