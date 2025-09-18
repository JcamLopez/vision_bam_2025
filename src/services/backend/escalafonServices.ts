
import { db } from '@/libs/db';
export async function obtenerEscalafon() {
    try {
        const [rows] = await db.query('SELECT E.ID_ESCALAFON AS ID, E.ESCALAFON AS ES , E.ESTADO AS ESTA FROM ESCALAFON AS E');
        const formacion = (rows as any[]).map((row) => ({
            id: row.ID,
            escalafon: row.ES,
            estado: row.ESTA,
        }));
        return formacion;
    } catch (error) {
        console.error('Error al obtener el escalafon:', error);
        throw new Error('No se pudo cargar la lista de escalafon');
    }
}
