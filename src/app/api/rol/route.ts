import { NextResponse } from 'next/server'
import { obtenerRol } from '@/services/backend/rolServices';

export async function GET() {
    try {
        const roles = await obtenerRol();
        return NextResponse.json(roles);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}