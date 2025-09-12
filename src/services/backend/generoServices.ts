

import { db } from '@/libs/db';
export async function obtenerGenero() {
    try {
        const [rows] = await db.query('SELECT GE.ID_GENERO AS ID,  GE.GENERO AS G FROM GENERO AS GE');
        const tipos = (rows as any[]).map((row) => ({
            id: row.ID,
            genero: row.G,
        }));
        return tipos;
    } catch (error) {
        console.error('Error al obtener el genero:', error);
        throw new Error('No se pudo cargar la lista de genero');
    }
}
