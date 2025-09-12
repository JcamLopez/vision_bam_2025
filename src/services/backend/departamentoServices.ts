

import { db } from '@/libs/db';
export async function obtenerDepartamento() {
    try {
        const [rows] = await db.query('SELECT D.ID_DEPARTAMENTO AS ID, D.NOMBRE AS N, D.CODIGO AS C FROM DEPARTAMENTO AS D');
        const tipos = (rows as any[]).map((row) => ({
            id: row.ID,
            nombre: row.N,
            codigo: row.C,
        }));
        return tipos;
    } catch (error) {
        console.error('Error al obtener el departamento:', error);
        throw new Error('No se pudo cargar la lista de departamento');
    }
}
