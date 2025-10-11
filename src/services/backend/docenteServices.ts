

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";
import { db } from '@/libs/db';

export async function RegistroDocente(data: usuarioPayload, connection: PoolConnection) {


    await connection.execute(
        'INSERT INTO DOCENTE (FK_PERSONA,FK_GRADO_ESCALAFON,FK_NIVEL_SALARIAL,FK_NIVEL_ACADEMICO,FK_FORMACION,TITULO,ESTADO) VALUES (?,?, ?,?,?,?,?)',
        [
            data.doc,
            data.grado_escalafon,
            data.nivel_salarial,
            data.nivel_academico,
            data.formacion,
            data.titulo_formacion,
            1
        ]
    );


}



export async function SolicitudDocente() {
    try {
        const [rows] = await db.query('SELECT P.DOCUMENTO AS DOC, P.N1, P.N2, P.AP1, P.AP2, G.GENERO AS GE, U.USUARIO AS USER  FROM USUARIO AS U INNER JOIN PERSONA AS P ON U.FK_PERSONA = P.DOCUEMENTO INNER JOIN GENERO AS G ON G.ID_GENERO = P.ID_GENERO ');
        const grados = (rows as any[]).map((row) => ({
            id: row.ID,
            grado: row.GRA,
            estado:row.ES
        }));
        return grados;
    } catch (error) {
        console.error('Error al obtener los grados:', error);
        throw new Error('No se pudo cargar la lista de grados');
    }
}



