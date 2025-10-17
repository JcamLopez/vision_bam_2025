

import { loginPayload } from '@/schemas/loginSchema';

export interface Permiso {
  nombre: string;
  ruta: string;
}

export interface UsuarioAutenticado {
  id: number;
  usuario: string;
  estado: string;
  rol: string;
  documento: string;
  nombres: string;
  apellidos: string;
  permisos: Permiso[];
}

export async function loginCliente(
  datos: loginPayload
): Promise<{
  resultado: {
    mensaje: string;
    usuario: UsuarioAutenticado;
  };
} | null> {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error(`Error al iniciar sesión (${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en loginCliente:', error);
    return null;
  }
}