
import { NextResponse } from "next/server";
import {SolicitudGeneral,ActualizarEstadoUsuario} from '@/services/backend/solicitudesServices'
export async function GET() {
  try {
    const data = await SolicitudGeneral();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error en la API de solicitudes:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const { usuario, estado } = await request.json();

    if (!usuario || !estado) {
      return NextResponse.json(
        { success: false, message: "Faltan datos: usuario o estado" },
        { status: 400 }
      );
    }

    const result = await ActualizarEstadoUsuario(usuario, estado);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error en la API de actualización de usuario:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}