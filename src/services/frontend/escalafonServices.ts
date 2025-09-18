

export async function obtenerEscalafon(): Promise<{id: number; escalafon: string; estado:boolean}[]> {
  try {
    const response = await fetch('/api/escalafon', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el escalafon');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en escalafonService:', error);
    return [];
  }
}
