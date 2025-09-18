

export async function obtenerNivelAcademico(): Promise<{id: number; nivel: string; estado:boolean}[]> {
  try {
    const response = await fetch('/api/nivel_academico', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el nivel academico');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en nivelAcademioService:', error);
    return [];
  }
}
