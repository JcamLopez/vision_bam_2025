export async function obtenerGenero(): Promise<{id: number; genero: string}[]> {
  try {
    const response = await fetch('/api/genero', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el genero');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en documentoService:', error);
    return [];
  }
}
