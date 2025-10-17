import { db } from "@/libs/db";
import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
import { loginPayload } from '@/schemas/loginSchema';

export async function iniciarSesion(data: loginPayload) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const usuario = await consultarUsuario(data, connection);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const coincide = await bcrypt.compare(data.clave, usuario.clave);

    if (!coincide) {
      throw new Error("Contraseña incorrecta");
    }

    await connection.commit();

    return {
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        estado: usuario.estado,
        rol: usuario.rol,
        documento: usuario.documento,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        permisos: usuario.permisos,
      },
    };
  } catch (error: any) {
    await connection.rollback();
    console.error("Error en iniciarSesion:", error);
    return {
      mensaje: "Error en login",
      usuario: null,
      error: error.message,
    };
  } finally {
    connection.release();
  }
}

const consultarUsuario = async (
  data: loginPayload,
  connection: PoolConnection
) => {
  try {
    const [rows] = await connection.query(
      `SELECT 
        U.ID_USUARIO AS ID, 
        U.USUARIO, 
        U.CLAVE,  
        U.ESTADO, 
        R.ROL, 
        P.DOCUMENTO, 
        P.N1, P.N2, P.AP1, P.AP2, 
        PE.PERMISO,
        PE.RUTA
      FROM USUARIO AS U 
      INNER JOIN PERSONA AS P ON P.DOCUMENTO = U.FK_PERSONA
      INNER JOIN ROL AS R ON R.ID_ROL = U.ID_ROL
      INNER JOIN ROL_TIENE_PERMISOS AS RP ON R.ID_ROL = RP.ID_ROL 
      INNER JOIN PERMISOS AS PE ON PE.ID_PERMISO = RP.ID_PERMISO 
      WHERE U.USUARIO = ? AND U.ESTADO = ?`,
      [data.usuario, 'ACTIVO']
    );

    const registros = rows as any[];
    if (registros.length === 0) return null;

    const base = registros[0];
    const permisos = registros.map((r) => ({
      nombre: r.PERMISO,
      ruta: r.RUTA || '#',
    }));

    return {
      id: base.ID,
      usuario: base.USUARIO,
      clave: base.CLAVE,
      estado: base.ESTADO,
      rol: base.ROL,
      documento: base.DOCUMENTO,
      nombres: `${base.N1} ${base.N2}`.trim(),
      apellidos: `${base.AP1} ${base.AP2}`.trim(),
      permisos,
    };
  } catch (error) {
    console.error("Error al consultar el usuario:", error);
    throw new Error("No se pudo consultar el usuario");
  }
};