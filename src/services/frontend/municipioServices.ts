

export async function obtenerMunicipio(departamentoId: number): Promise<{ id: number;  deapartamento: number; codigo : number, nombre: string }[]> {

  try {
    const response = await fetch(`/api/municipio?departamentoId=${departamentoId}`, {
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
