import { NextResponse } from 'next/server'
import { obtenerDepartamento } from '@/services/backend/departamentoServices';

export async function GET() {
    try {
        const departamento = await obtenerDepartamento();
        return NextResponse.json(departamento);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}