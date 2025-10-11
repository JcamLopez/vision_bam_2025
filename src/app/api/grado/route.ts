import { NextResponse } from 'next/server'
import { obtenerGrados } from '@/services/backend/gradoServices';

export async function GET() {
    try {
        const grados = await obtenerGrados();
        return NextResponse.json(grados);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}