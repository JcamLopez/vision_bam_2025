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



export async function insertarTipoDeDocumento(tipo: string, estado: string) {
  try {
    const query = 'INSERT INTO TIPO_DOCUMENTO (TIPO, ESTADO) VALUES (?, ?)';
    const [result] = await db.execute(query, [tipo, estado]);

    return {
      mensaje: 'Tipo de documento insertado correctamente',
      idInsertado: (result as any).insertId,
    };
  } catch (error) {
    console.error('Error al insertar tipo de documento:', error);
    throw new Error('No se pudo insertar el tipo de documento');
  }
}


export async function actualizarTipoDeDocumento(id: string, tipo: string, estado: string) {
  const query = 'UPDATE TIPO_DOCUMENTO SET TIPO = ?, ESTADO = ? WHERE TIPO = ?';
  const [result] = await db.execute(query, [tipo, estado, id]);
  return (result as any).affectedRows > 0;
}

export async function desactivarTipoDeDocumento(id: string) {
  const query = 'UPDATE TIPO_DOCUMENTO SET ESTADO = ? WHERE TIPO = ?';
  const [result] = await db.execute(query, ['INACTIVO', id]);
  return (result as any).affectedRows > 0;
}


