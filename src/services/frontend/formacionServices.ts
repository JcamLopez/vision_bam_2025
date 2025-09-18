

export async function obtenerFormacion(): Promise<{id: number; formacion: string; estado:boolean}[]> {
  try {
    const response = await fetch('/api/formacion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al consultar la formacion');
    }

    const data = await response.json();
    console.log("esta es mi data ")
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error en formacionService:', error);
    return [];
  }
}
