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



export async function actualizarEstadoUsuario(usuario: string, estado: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/solicitudes_registro", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, estado }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el estado del usuario");
    }

    const data = await response.json();
    return data; // { success: true, message: "..."}
  } catch (error) {
    console.error("Error en actualizarEstadoUsuario:", error);
    return { success: false, message: "No se pudo actualizar el estado del usuario" };
  }
}


