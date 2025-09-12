

export async function obtenerDepartamento(): Promise<{id: number; nombre: string; cod: number}[]> {
  try {
    const response = await fetch('/api/departamento', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el departamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en departamentoServices:', error);
    return [];
  }
}
