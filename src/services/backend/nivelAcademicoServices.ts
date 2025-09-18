
import { db } from '@/libs/db';
export async function obtenerNivelAcademico() {
    try {
        const [rows] = await db.query('SELECT N.ID_NIVEL_ACADEMICO AS ID, N.NIVEL AS NI, N.ESTADO AS ES FROM NIVEL_ACADEMICO AS N');
        const nivel = (rows as any[]).map((row) => ({
            id: row.ID,
            nivel: row.NI,
            estado: row.ES,
        }));
        return nivel;
    } catch (error) {
        console.error('Error al obtener el nivel academico:', error);
        throw new Error('No se pudo cargar la lista de nivel academico');
    }
}
