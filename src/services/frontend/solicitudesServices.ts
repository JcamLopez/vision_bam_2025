export async function obtenerSolicitudes(): Promise<{
    estudiantes: any[];
    docentes: any[];
}> {
    try {
        const response = await fetch("/api/solicitudes_registro", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al consultar las solicitudes");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en solicitudService:", error);
        return { estudiantes: [], docentes: [] };
    }
}