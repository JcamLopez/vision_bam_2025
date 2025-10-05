
import { db } from '@/libs/db';
export async function obtenerEscalafon() {
    try {
        const [rows] = await db.query('SELECT E.ID_GRADO_ESCALAFON AS ID, E.GRADO_ESCALAFON AS ES , E.ESTADO AS ESTA FROM  GRADO_ESCALAFON AS E');
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




export async function obtenernEscalafonPorNombre(escalafon: string) {
    try {
        const [rows] = await db.query(
            'SELECT E.ID_ESCALAFON AS ID, E.ESCALAFON AS ES , E.ESTADO AS ESTA FROM ESCALAFON AS E WHERE E.ESCALAFON = ?',
            [escalafon]
        );

        if ((rows as any[]).length === 0) {
            throw new Error(`No se encontró el rol con nombre "${escalafon}"`);
        }

        const row = (rows as any[])[0];

        return {
            id: row.ID,
            escalafon: row.ES,
            estado: row.ESTA,
        };
    } catch (error) {
        console.error('Error al obtener el escalafon:', error);
        throw new Error('No se pudo cargar el escalafon');
    }
}
