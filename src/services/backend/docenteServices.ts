

import { usuarioPayload } from '@/schemas/usuarioSchema'
import { PoolConnection } from "mysql2/promise";

export async function RegistroDocente(data: usuarioPayload, connection: PoolConnection) {
/*     console.log("perra")
    console.log(data.formacion)
    const id_formacion = (await obtenernFormacioPorNombre(data.formacion!)).id
    const id_escalafon = (await obtenernEscalafonPorNombre(data.grado_escalafon!)).id
    const id_nivel_salarial = (await obtenernNivelSalarialPorNombre(data.nivel_salarial!)).id
    const id_nivel_academico = (await obtenernNivelAcademicoPorNombre(data.nivel_academico!)).id
    console.log("formacion")
    console.log(id_formacion)
        console.log("escalafon")
    console.log(id_escalafon)
        console.log("salarial")
    console.log(id_nivel_salarial)
        console.log("academia")
    console.log(id_nivel_academico)
    await connection.execute(
        'INSERT INTO DOCENTE (FK_PERSONA,FK_FORMACION,FK_ESCALAFON,FK_NIVEL_SALARIAL,FK_NIVEL_ACADEMICO,TITULO,ESTADO) VALUES (?,?, ?,?,?,?,?',
        [
            data.doc,
            id_formacion,
            id_escalafon,
            id_nivel_salarial,
            id_nivel_academico,
            data.titulo_formacion,
            1
        ]
    );  */


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