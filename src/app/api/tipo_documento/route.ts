
import { obtenerTiposDeDocumento,insertarTipoDeDocumento,actualizarTipoDeDocumento,desactivarTipoDeDocumento } from '@/services/backend/tipo_documentoSevices';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tipos = await obtenerTiposDeDocumento();
        return NextResponse.json(tipos);
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}


 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo, estado } = body;

    if (!tipo || !estado) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: tipo y estado' },
        { status: 400 }
      );
    }

    const resultado = await insertarTipoDeDocumento(tipo, estado);

    return NextResponse.json(
      { mensaje: 'Tipo de documento creado', id: resultado.idInsertado },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST /tipo-documento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, tipo, estado } = body;

    if (!id || !tipo || !estado) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: id, tipo y estado' },
        { status: 400 }
      );
    }

    const actualizado = await actualizarTipoDeDocumento(id, tipo, estado);

    return NextResponse.json(
      { mensaje: 'Tipo de documento actualizado correctamente', actualizado },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en PUT /tipo-documento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}



export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Falta el campo requerido: id' },
        { status: 400 }
      );
    }

    const actualizado = await desactivarTipoDeDocumento(id);

    if (!actualizado) {
      return NextResponse.json(
        { error: 'No se encontró el tipo de documento o ya estaba inactivo' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensaje: 'Tipo de documento desactivado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en DELETE lógico /tipo-documento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
