

export async function obtenerNivelSalarial(): Promise<{id: number; nivel: string; estado:boolean}[]> {
  try {
    const response = await fetch('/api/nivel_salarial', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el nivel salarial');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en nivelSalarialService:', error);
    return [];
  }
}
