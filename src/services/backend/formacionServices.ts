
import { db } from '@/libs/db';
export async function obtenerFormacion() {
    try {
        const [rows] = await db.query('SELECT F.ID_FORMACION AS FO, F.FORMACION AS FORMA, F.ESTADO AS E FROM FORMACION AS F');
        const formacion = (rows as any[]).map((row) => ({
            id: row.FO,
            formacion: row.FORMA,
            estado: row.E,
        }));
        return formacion;
    } catch (error) {
        console.error('Error al obtener la formacion:', error);
        throw new Error('No se pudo cargar la lista de formacion');
    }
}
