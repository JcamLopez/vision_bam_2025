
import { db } from '@/libs/db';



export async function SolicitudEstudiante() {
  try {
    const [rows] = await db.query(`
      SELECT 
        U.USUARIO AS USER,
        U.ESTADO AS ESTADO_USER,
        PER_ESTU.DOCUMENTO AS DOC_ESTU,
        PER_ESTU.N1 AS N1_ESTU,
        PER_ESTU.N2 AS N2_ESTU,
        PER_ESTU.AP1 AS AP1_ESTU,
        PER_ESTU.AP2 AS AP2_ESTU,
        TEL_ES.NUMERO AS TELEFONO_ESTUDIANTE,
        ESTU_GENERO.GENERO AS GENERO_ESTU,
        TIPO_DOC_ESTU.TIPO AS TIPO_DOC_ESTU,
        UBI_ESTU.DIRECCION AS DIRECCION_ESTU,
        UBI_ESTU.BARRIO AS BARRIO_ESTU,
        MUNI_ESTU.NOMBRE AS MUNI_ESTU,
        DEPA_ESTU.NOMBRE AS DEPART_ESTU,
        ROL.ROL,
        ESTU_CORREO.CORREO AS CORREO_ESTU,
        G.GRADO,
        AC.PARENTESCO,
        PER_ACU.DOCUMENTO AS DOC_ACU,
        PER_ACU.N1 AS N1_ACU,
        PER_ACU.N2 AS N2_ACU,
        PER_ACU.AP1 AS AP1_ACU,
        PER_ACU.AP2 AS AP2_ACU,
        CORRE_ACU.CORREO AS CORREO_ACU,
        UBI_ACU.DIRECCION AS DIRECCION_ACU,
        UBI_ACU.BARRIO AS BARRIO_ACU,
        MUNI_ACU.NOMBRE AS MUNICIPIO_ACU,
        DEPART_ACU.NOMBRE AS DEPARTAMENTO_ACU,
        TEL_ACU.NUMERO AS TELEFONO_ACU
      FROM USUARIO AS U
      INNER JOIN ROL ON ROL.ID_ROL = U.ID_ROL
      INNER JOIN PERSONA AS PER_ESTU ON PER_ESTU.DOCUMENTO = U.FK_PERSONA
      LEFT JOIN TELEFONO AS TEL_ES ON TEL_ES.FK_PERSONA = PER_ESTU.DOCUMENTO
      LEFT JOIN UBICACION AS UBI_ESTU ON UBI_ESTU.FK_PERSONA = PER_ESTU.DOCUMENTO
      LEFT JOIN MUNICIPIO AS MUNI_ESTU ON MUNI_ESTU.ID_MUNICIPIO = UBI_ESTU.FK_MUNICIPIO
      LEFT JOIN DEPARTAMENTO AS DEPA_ESTU ON MUNI_ESTU.FK_DEPARTAMENTO = DEPA_ESTU.ID_DEPARTAMENTO
      LEFT JOIN GENERO AS ESTU_GENERO ON PER_ESTU.ID_GENERO = ESTU_GENERO.ID_GENERO
      LEFT JOIN TIPO_DOCUMENTO AS TIPO_DOC_ESTU ON PER_ESTU.ID_TIPO_DOCUMENTO = TIPO_DOC_ESTU.TIPO
      LEFT JOIN CORREO AS ESTU_CORREO ON PER_ESTU.DOCUMENTO = ESTU_CORREO.ID_PERSONA
      INNER JOIN ESTUDIANTE AS ESTU ON ESTU.ID_PERSONA = PER_ESTU.DOCUMENTO
      INNER JOIN GRADO AS G ON G.ID_GRADO = ESTU.ID_GRADO
      INNER JOIN ACUDIENTE AS AC ON ESTU.ID_ACUDIENTE = AC.ID_ACUDIENTE
      LEFT JOIN PERSONA AS PER_ACU ON PER_ACU.DOCUMENTO = AC.FK_PERSONA
      LEFT JOIN CORREO AS CORRE_ACU ON PER_ACU.DOCUMENTO = CORRE_ACU.ID_PERSONA
      LEFT JOIN UBICACION AS UBI_ACU ON UBI_ACU.FK_PERSONA = PER_ACU.DOCUMENTO
      LEFT JOIN MUNICIPIO AS MUNI_ACU ON MUNI_ACU.ID_MUNICIPIO = UBI_ACU.FK_MUNICIPIO
      LEFT JOIN DEPARTAMENTO AS DEPART_ACU ON DEPART_ACU.ID_DEPARTAMENTO = MUNI_ACU.FK_DEPARTAMENTO
      LEFT JOIN TELEFONO AS TEL_ACU ON TEL_ACU.FK_PERSONA = PER_ACU.DOCUMENTO
      WHERE U.ESTADO = 'PENDIENTE' AND ROL.ROL = 'ESTUDIANTE';
    `);

    const estudiantes = (rows as any[]).map((row) => ({
      usuario: row.USER,
      estado: row.ESTADO_USER,
      documento: row.DOC_ESTU,
      nombres: `${row.N1_ESTU} ${row.N2_ESTU}`.trim(),
      apellidos: `${row.AP1_ESTU} ${row.AP2_ESTU}`.trim(),
      telefono: row.TELEFONO_ESTUDIANTE,
      genero: row.GENERO_ESTU,
      tipoDocumento: row.TIPO_DOC_ESTU,
      direccion: row.DIRECCION_ESTU,
      barrio: row.BARRIO_ESTU,
      municipio: row.MUNI_ESTU,
      departamento: row.DEPART_ESTU,
      rol: row.ROL,
      correo: row.CORREO_ESTU,
      grado: row.GRADO,
      acudiente: {
        parentesco: row.PARENTESCO,
        documento: row.DOC_ACU,
        nombres: `${row.N1_ACU} ${row.N2_ACU}`.trim(),
        apellidos: `${row.AP1_ACU} ${row.AP2_ACU}`.trim(),
        correo: row.CORREO_ACU,
        telefono: row.TELEFONO_ACU,
        direccion: row.DIRECCION_ACU,
        barrio: row.BARRIO_ACU,
        municipio: row.MUNICIPIO_ACU,
        departamento: row.DEPARTAMENTO_ACU,
      }
    }));

    return estudiantes;
  } catch (error) {
    console.error("Error al obtener las solicitudes de estudiantes:", error);
    throw new Error("No se pudo cargar la lista de solicitudes de estudiantes");
  }
}



export async function SolicitudDocente() {
  try {
    const [rows] = await db.query(`
      SELECT 
        U.USUARIO AS USER, 
        U.ESTADO, 
        P.DOCUMENTO, 
        P.N1,
        P.N2, 
        P.AP1, 
        P.AP2,
        TEL.NUMERO, 
        G.GENERO,  
        T.TIPO AS TIPO_DOCUMENTO, 
        UB.DIRECCION, 
        UB.BARRIO, 
        M.NOMBRE  AS MUNICIPIO,
        D.NOMBRE AS DEPARTAMENTO, 
        R.ROL, 
        C.CORREO,
        DC.TITULO,
        FM.FORMACION,
        NS.NIVEL AS NIVEL_SALARIAL,
        NA.NIVEL AS NIVEL_ACADEMICO,
        GE.GRADO_ESCALAFON
      FROM USUARIO AS U
      INNER JOIN PERSONA AS P ON P.DOCUMENTO= U.FK_PERSONA
      INNER JOIN GENERO AS G ON G.ID_GENERO = P.ID_GENERO
      INNER JOIN TELEFONO AS TEL ON TEL.FK_PERSONA = P.DOCUMENTO
      INNER JOIN TIPO_DOCUMENTO AS T ON T.TIPO = P.ID_TIPO_DOCUMENTO
      INNER JOIN UBICACION AS UB ON UB.FK_PERSONA = P.DOCUMENTO
      INNER JOIN MUNICIPIO AS M ON M.ID_MUNICIPIO = UB.FK_MUNICIPIO
      INNER JOIN DEPARTAMENTO AS D ON D.ID_DEPARTAMENTO = M.FK_DEPARTAMENTO
      INNER JOIN ROL AS R ON R.ID_ROL = U.ID_ROL
      INNER JOIN CORREO AS C ON C.ID_PERSONA = P.DOCUMENTO 
      INNER JOIN DOCENTE AS DC ON DC.FK_PERSONA = P.DOCUMENTO
      INNER JOIN FORMACION AS FM ON FM.ID_FORMACION = DC.FK_FORMACION 
      INNER JOIN NIVEL_ACADEMICO AS NA ON NA.ID_NIVEL_ACADEMICO = DC.FK_NIVEL_ACADEMICO
      INNER JOIN NIVEL_SALARIAL AS NS ON NS.ID_NIVEL_SALARIAL = DC.FK_NIVEL_SALARIAL
      INNER JOIN GRADO_ESCALAFON AS GE ON GE.ID_GRADO_ESCALAFON = DC.FK_GRADO_ESCALAFON
      WHERE U.ESTADO = 'PENDIENTE' AND R.ROL = 'DOCENTE';
    `);

    const docentes = (rows as any[]).map((row) => ({
      usuario: row.USER,
      estado: row.ESTADO,
      documento: row.DOCUMENTO,
      nombres: `${row.N1} ${row.N2}`,
      apellidos: `${row.AP1} ${row.AP2}`,
      telefono: row.NUMERO,
      genero: row.GENERO,
      tipoDocumento: row.TIPO_DOCUMENTO,
      direccion: row.DIRECCION,
      barrio: row.BARRIO,
      municipio: row.MUNICIPIO,
      departamento: row.DEPARTAMENTO,
      rol: row.ROL,
      correo: row.CORREO,
      titulo: row.TITULO,
      formacion: row.FORMACION,
      nivelSalarial: row.NIVEL_SALARIAL,
      nivelAcademico: row.NIVEL_ACADEMICO,
      gradoEscalafon: row.GRADO_ESCALAFON,
    }));

    return docentes;
  } catch (error) {
    console.error("Error al obtener las solicitudes de docentes:", error);
    throw new Error("No se pudo cargar la lista de solicitudes de docentes");
  }
}


export async function SolicitudGeneral() {
  try {
    const [estudiantes, docentes] = await Promise.all([
      SolicitudEstudiante(),
      SolicitudDocente(),
    ]);

    return { estudiantes, docentes };
  } catch (error) {
    console.error("Error al obtener las solicitudes generales:", error);
    throw new Error("No se pudieron cargar las solicitudes generales");
  }
}


export async function ActualizarEstadoUsuario(usuario: string, estado: string) {
  try {
    const [result]: any = await db.query(
      `
      UPDATE USUARIO
      SET ESTADO = ?
      WHERE USUARIO = ?;
      `,
      [estado, usuario]
    );

    if (result.affectedRows === 0) {
      throw new Error(`No se encontró un usuario con el nombre '${usuario}'`);
    }

    console.log(`✅ Usuario '${usuario}' actualizado a estado del usuario a '${estado}'`);
    return { success: true, message: `Usuario '${usuario}' modificado correctamente` };

  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', error);
    throw new Error('No se pudo actualizar el estado del usuario');
  }
}

