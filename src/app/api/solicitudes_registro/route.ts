
import { NextResponse } from "next/server";
import {SolicitudGeneral} from '@/services/backend/solicitudesServices'
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