

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


export async function obtenerGeneroPorNombre(genero: string) {
    try {
        const [rows] = await db.query(
            'SELECT GE.ID_GENERO AS ID,  GE.GENERO AS G, GE.ESTADO AS ES FROM GENERO AS GE  WHERE GE.GENERO = ?',
            [genero]
        );

        if ((rows as any[]).length === 0) {
            throw new Error(`No se encontró el rol con nombre "${genero}"`);
        }

        const row = (rows as any[])[0];

        return {
            id: row.ID,
            rol: row.G,
            estado: row.ES,
        };
    } catch (error) {
        console.error('Error al obtener el genero por nombre:', error);
        throw new Error('No se pudo cargar el genero seleccionado');
    }
}
