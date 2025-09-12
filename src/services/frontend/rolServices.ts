export async function obtenerRol(): Promise<{id: number; rol: string; estado:boolean}[]> {
  try {
    const response = await fetch('/api/rol', {
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
