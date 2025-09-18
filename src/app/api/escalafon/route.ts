import { NextResponse } from 'next/server'
import { obtenerEscalafon } from '@/services/backend/escalafonServices';

export async function GET() {
    try {
        const escalafon = await obtenerEscalafon();
        return NextResponse.json(escalafon);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}