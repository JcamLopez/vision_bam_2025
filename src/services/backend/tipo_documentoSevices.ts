import { db } from '@/libs/db';
export async function obtenerTiposDeDocumento() {
    try {
        const [rows] = await db.query('SELECT T.TIPO AS TI, T.ESTADO AS ES FROM TIPO_DOCUMENTO AS T');
        const tipos = (rows as any[]).map((row) => ({
            id: row.TI,
            estado: row.ES,
        }));
        return tipos;

    } catch (error) {
        console.error('Error al obtener tipos de documento:', error);
        throw new Error('No se pudo cargar la lista de tipos de documento');
    }
}
