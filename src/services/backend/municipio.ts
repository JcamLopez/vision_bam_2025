

import { db } from '@/libs/db';
export async function obtenerMunicipio(departamentoId: number) {
    try {
        const [rows] = await db.query('SELECT M.ID_MUNICIPIO AS ID, M.FK_DEPARTAMENTO AS DEPA, M.CODIGO AS COD, M.NOMBRE AS MUNI FROM MUNICIPIO AS M WHERE  M.FK_DEPARTAMENTO = ?', [departamentoId]);
        const tipos = (rows as any[]).map((row) => ({
            id: row.ID,
            depa: row.DEPA,
            cod: row.COD,
            muni: row.MUNI,
        }));
        return tipos;
    } catch (error) {
        console.error('Error al obtener los municipios:', error);
        throw new Error('No se pudo cargar la lista de municipios');

    }
}
