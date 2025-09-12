
import { obtenerTiposDeDocumento } from '@/services/backend/tipo_documentoSevices';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tipos = await obtenerTiposDeDocumento();
        return NextResponse.json(tipos);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}