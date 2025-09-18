import { NextResponse } from 'next/server'
import { obtenerSalarial } from '@/services/backend/nivelSalarialServices';

export async function GET() {
    try {
        const nivel = await obtenerSalarial();
        return NextResponse.json(nivel);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}