

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";





export async function RegistroPersonaPersonaAcudiente(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO PERSONA (DOCUMENTO, ID_TIPO_DOCUMENTO,ID_INSTITUCION,ID_GENERO,N1,N2,AP1,AP2) VALUES (?,?,?,?,?,?,?,?)',
        [
            data.numero_documento_acudiente,
            "CC",
            1,
            1,
            data.n1_acudiente,
            data.n2_acudiente,
            data.ap1_acudiente,
            data.ap2_acudiente
        ]
    );
}

export async function registro_ubicacion_acudiente(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO UBICACION (FK_PERSONA,FK_MUNICIPIO,BARRIO,DIRECCION) VALUES (?, ?,?,?)',
        [
            data.numero_documento_acudiente,
            data.municipio_acudiente,
            data.barrio_acudiente,
            data.direccion_acudiente
        ]
    );
}


export async function registro_correo_acudiente(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO CORREO (ID_PERSONA,CORREO,ESTADO) VALUES (?, ?, ?)',
        [
            data.numero_documento_acudiente,
            data.correo_acudiente,
            1
        ]
    );
}

export async function RegistroAcudiente(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO ACUDIENTE (FK_PERSONA,PARENTESCO,ESTADO) VALUES (?,?,?)',
        [
            data.numero_documento_acudiente,
            data.parentezco,
            1
        ]
    );
}
export async function registro_telefono_acudiente(data: usuarioPayload, connection: PoolConnection) {
    await connection.execute(
        'INSERT INTO TELEFONO (FK_PERSONA,NUMERO) VALUES (?, ?)',
        [
            data.n1_acudiente,
            data.tel
        ]
    );
}