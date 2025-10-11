export async function obtenerGrados(): Promise<{ id: number; grado: string, estado: boolean }[]> {
    try {
        const response = await fetch('/api/grado', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al consultar el grado');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en gradoService:', error);
        return [];
    }
}
