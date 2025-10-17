"use client";

import style from "./estilo.module.css";
import Menu from '@/components/ui/nav/menu'

import { useEffect, useState } from "react";

type Permiso = {
  nombre: string;
  ruta: string;
};

export default function CrearPublicacion() {
    const [tipo, setTipo] = useState("texto");
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [permisos, setPermisos] = useState<Permiso[]>([]);
    const [nombre, setNombre] = useState<string>("");
    useEffect(() => {


        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const user = JSON.parse(usuarioGuardado);
            /*    setUsuario(user); */

            const permisosAdaptados: Permiso[] = (user.permisos || []).map((p: any) => {
                return typeof p === 'string'
                    ? { nombre: p, ruta: '#' }
                    : { nombre: p.nombre, ruta: p.ruta || '#' };
            });

            setPermisos(permisosAdaptados);

            const nombreCompleto = `${user.nombres ?? ''} ${user.apellidos ?? ''}`
                .replace('null', '')
                .trim();

            setNombre(nombreCompleto);
        }
    }, []);
    const handleSubmit = () => {


        console.log({ tipo, titulo, contenido, archivo });
    };

    return (
        <>
            <Menu nombre={nombre} permisos={permisos}/>
            <div className={style.contenedor}>
                <h1 className={style.titulo}>Crear Nueva Publicación</h1>

                <form className={style.formulario} onSubmit={handleSubmit}>
                    {/* Tipo de publicación */}
                    <div className={style.campo}>
                        <label>Tipo de publicación:</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="texto">📝 Texto</option>
                            <option value="imagen">🖼️ Imagen</option>
                            <option value="video">🎥 Video</option>
                        </select>
                    </div>

                    {/* Título */}
                    <div className={style.campo}>
                        <label>Título:</label>
                        <input
                            type="text"
                            placeholder="Escribe el título aquí"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>

                    {/* Contenido (solo texto) */}
                    {tipo === "texto" && (
                        <div className={style.campo}>
                            <label>Contenido:</label>
                            <textarea
                                placeholder="Escribe el contenido de la publicación..."
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}

                                required
                            />
                        </div>
                    )}

                    {/* Archivo multimedia (imagen o video) */}
                    {(tipo === "imagen" || tipo === "video") && (
                        <div className={style.campo}>
                            <label>Archivo {tipo === "imagen" ? "de imagen" : "de video"}:</label>
                            <input
                                type="file"
                                accept={tipo === "imagen" ? "image/*" : "video/*"}

                                required
                            />
                        </div>
                    )}

                    {/* Vista previa */}
                    {archivo && (
                        <div className={style.preview}>
                            {tipo === "imagen" && (
                                <img src={URL.createObjectURL(archivo)} alt="Vista previa" />
                            )}
                            {tipo === "video" && (
                                <video controls>
                                    <source src={URL.createObjectURL(archivo)} type="video/mp4" />
                                </video>
                            )}
                        </div>
                    )}

                    <button type="submit" className={style.boton}>
                        Publicar
                    </button>
                </form>
            </div>
        </>

    );
}