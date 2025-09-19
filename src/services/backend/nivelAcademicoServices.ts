
import { db } from '@/libs/db';
export async function obtenerNivelAcademico() {
    try {
        const [rows] = await db.query('SELECT N.ID_NIVEL_ACADEMICO AS ID, N.NIVEL AS NI, N.ESTADO AS ES FROM NIVEL_ACADEMICO AS N');
        const nivel = (rows as any[]).map((row) => ({
            id: row.ID,
            nivel: row.NI,
            estado: row.ES
        }));
        return nivel;
    } catch (error) {
        console.error('Error al obtener el nivel academico:', error);
        throw new Error('No se pudo cargar la lista de nivel academico');
    }
}



export async function obtenernNivelAcademicoPorNombre(nivel: string) {
    try {
        const [rows] = await db.query(
            'SELECT N.ID_NIVEL_ACADEMICO AS ID, N.NIVEL AS NI, N.ESTADO AS ES FROM NIVEL_ACADEMICO AS N WHERE N.NIVEL = ?',
            [nivel]
        );

        if ((rows as any[]).length === 0) {
            throw new Error(`No se encontró el rol con nombre "${nivel}"`);
        }

        const row = (rows as any[])[0];

        return {
            id: row.ID,
            nivel: row.NI,
            estado: row.ES
        };
    } catch (error) {
        console.error('Error al obtener nivel academico:', error);
        throw new Error('No se pudo cargar el nivel academico');
    }
}
