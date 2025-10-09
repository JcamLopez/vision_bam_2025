
import { db } from '@/libs/db';
export async function obtenerGrados() {
    try {
        const [rows] = await db.query('SELECT G.ID_GRADO AS ID, G.GRADO AS GRA, G.ESTADO AS ES FROM GRADO AS G');
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