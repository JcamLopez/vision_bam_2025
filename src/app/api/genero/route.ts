import { NextResponse } from 'next/server'
import { obtenerGenero } from '@/services/backend/generoServices';

export async function GET() {
    try {
        const generos = await obtenerGenero();
        return NextResponse.json(generos);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}