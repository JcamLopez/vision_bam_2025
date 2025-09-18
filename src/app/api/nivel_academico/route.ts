import { NextResponse } from 'next/server'
import { obtenerNivelAcademico } from '@/services/backend/nivelAcademicoServices';

export async function GET() {
    try {
        const nivel = await obtenerNivelAcademico();
        return NextResponse.json(nivel);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}