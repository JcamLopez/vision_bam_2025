export async function obtenerMunicipio(): Promise<{id: number; depa: number; cod:number , muni:string}[]> {
  try {
    const response = await fetch('/api/genero', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar el municipio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en municipioService:', error);
    return [];
  }
}
