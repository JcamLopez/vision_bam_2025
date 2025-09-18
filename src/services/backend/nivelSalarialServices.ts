
import { db } from '@/libs/db';
export async function obtenerSalarial() {
    try {
        const [rows] = await db.query('SELECT N.ID_NIVEL_SALARIAL AS ID, N.NIVEL AS NI, N.ESTADO AS ES FROM NIVEL_SALARIAL AS N');
        const nivel = (rows as any[]).map((row) => ({
            id: row.ID,
            nivel: row.NI,
            estado: row.ES,
        }));
        return nivel;
    } catch (error) {
        console.error('Error al obtener el nivel salarial:', error);
        throw new Error('No se pudo cargar la lista de nivel salarial');
    }
}
