export async function obtenerTiposDeDocumento(): Promise<{id: string; estado: boolean}[]> {
  try {
    const response = await fetch('/api/tipo_documento', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar tipos de documento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en documentoService:', error);
    return [];
  }
}
