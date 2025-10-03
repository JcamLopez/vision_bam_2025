

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";

export async function RegistroDocente(data: usuarioPayload, connection: PoolConnection) {


    await connection.execute(
        'INSERT INTO DOCENTE (FK_PERSONA,FK_FORMACION,FK_ESCALAFON,FK_NIVEL_SALARIAL,FK_NIVEL_ACADEMICO,TITULO,ESTADO) VALUES (?,?, ?,?,?,?,?)',
        [
            data.doc,
            data.formacion,
            data.grado_escalafon,
            data.nivel_salarial,
            data.nivel_academico,
            data.titulo_formacion,
            1
        ]
    );


}