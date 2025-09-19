
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


export async function obtenernNivelSalarialPorNombre(nivel: string) {
    try {
        const [rows] = await db.query(
            'SELECT N.ID_NIVEL_SALARIAL AS ID, N.NIVEL AS NI, N.ESTADO AS ES FROM NIVEL_SALARIAL AS N WHERE N.NIVEL = ?',
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
        console.error('Error al obtener nivel salarial:', error);
        throw new Error('No se pudo cargar el nivel salarial');
    }
}