
import { db } from '@/libs/db';

export async function obtenerMunicipio(departamentoId: number) {
 
    try {
        const [rows] = await db.query('SELECT M.ID_MUNICIPIO AS ID, M.FK_DEPARTAMENTO AS D, M.CODIGO AS C, M.NOMBRE AS N FROM MUNICIPIO AS M WHERE M.FK_DEPARTAMENTO = ?', [departamentoId]);
        const tipos = (rows as any[]).map((row) => ({
            id: row.ID,
            deapartamento: row.D,
            codigo: row.C,
            nombre: row.N,
        }));
        return tipos;
    } catch (error) {
        console.error('Error al obtener el municipio:', error);
        throw new Error('No se pudo cargar la lista de municipio');
    }
}
