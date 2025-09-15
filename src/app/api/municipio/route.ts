import { NextResponse } from 'next/server';
import { departamentoSchema } from '@/schemas/municipioSchema'
import { obtenerMunicipio } from '@/services/backend/municipioServices';


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const departamentoId = searchParams.get('departamentoId');
    const result = departamentoSchema.safeParse({ departamentoId });
    if (!result.success) {
        console.warn('[API] Error de validación:', result.error.format());
        return NextResponse.json({ error: 'ID de departamento inválido' }, { status: 400 });
    }
    const depaId = Number(departamentoId);
    const municipios = await obtenerMunicipio(depaId);
    return NextResponse.json(municipios);

}
