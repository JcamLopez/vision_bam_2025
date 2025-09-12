

import { db } from '@/libs/db';
export async function obtenerRol() {
    try {
        const [rows] = await db.query('SELECT RO.ID_ROL AS ID,  RO.ROL AS R , RO.ESTADO AS ES FROM ROL AS RO');
        const tipos = (rows as any[]).map((row) => ({
            id: row.ID,
            rol: row.R,
            estado: row.ES,
        }));
        return tipos;
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        throw new Error('No se pudo cargar la lista de rol');
    }
}
