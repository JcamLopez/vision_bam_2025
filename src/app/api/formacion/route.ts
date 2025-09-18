import { NextResponse } from 'next/server'
import { obtenerFormacion } from '@/services/backend/formacionServices';

export async function GET() {
    try {
        const formacion = await obtenerFormacion();
        return NextResponse.json(formacion);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}