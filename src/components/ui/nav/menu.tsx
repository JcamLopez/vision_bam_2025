/* 

'use client';

import { useState, useEffect, useRef } from 'react';
import estilo from './estilo.module.css';
import { LogOut, Menu, X, UserCog } from 'lucide-react';

type EncabezadoConSidebarProps = {
  nombre: string;
  permisos: string[];
};

export default function EncabezadoConSidebar({ nombre, permisos }: EncabezadoConSidebarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    }
    if (menuAbierto) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuAbierto]);

  return (
    <>
      <header className={estilo.header}>
        <h1 className={estilo.titulo}>{nombre}</h1>
        <button className={estilo.menuBoton} onClick={() => setMenuAbierto(true)}>
          <Menu size={26} />
        </button>
      </header>

      {menuAbierto && <div className={estilo.overlay} onClick={() => setMenuAbierto(false)}></div>}

      <aside ref={sidebarRef} className={`${estilo.sidebar} ${menuAbierto ? estilo.abierto : ''}`}>
        <div className={estilo.sidebarHeader}>
          <UserCog className={estilo.iconUser} />
          <h2 className={estilo.usuarioNombre}>{nombre}</h2>
          <button className={estilo.cerrarBtn} onClick={() => setMenuAbierto(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className={estilo.nav}>
          {permisos.map((permiso, index) => (
            <a key={index} href="#" className={estilo.link}>
              <span>🟡</span> {permiso}
            </a>
          ))}
        </nav>

        <div className={estilo.footer}>
          <button className={estilo.logoutBtn}>
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
} */


'use client';

import { useState, useEffect, useRef } from 'react';
import estilo from './estilo.module.css';
import { LogOut, Menu, X, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Permiso = {
  nombre: string;
  ruta: string;
};

type EncabezadoConSidebarProps = {
  nombre: string;
  permisos: Permiso[]; 
};

export default function EncabezadoConSidebar({ nombre, permisos }: EncabezadoConSidebarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    }
    if (menuAbierto) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuAbierto]);

  const manejarClickPermiso = (ruta: string) => {
    router.push(ruta);
    setMenuAbierto(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    router.push('/');
  };

  return (
    <>
      <header className={estilo.header}>
        <h1 className={estilo.titulo}>{nombre}</h1>
        <button className={estilo.menuBoton} onClick={() => setMenuAbierto(true)}>
          <Menu size={26} />
        </button>
      </header>

      {menuAbierto && <div className={estilo.overlay} onClick={() => setMenuAbierto(false)}></div>}

      <aside ref={sidebarRef} className={`${estilo.sidebar} ${menuAbierto ? estilo.abierto : ''}`}>
        <div className={estilo.sidebarHeader}>
          <UserCog className={estilo.iconUser} />
          <h2 className={estilo.usuarioNombre}>{nombre}</h2>
          <button className={estilo.cerrarBtn} onClick={() => setMenuAbierto(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className={estilo.nav}>
          {permisos.map((permiso, index) => (
            <button
              key={index}
              onClick={() => manejarClickPermiso(permiso.ruta)}
              className={estilo.link}
            >
              <span>🟡</span> {permiso.nombre}
            </button>
          ))}
        </nav>

        <div className={estilo.footer}>
          <button className={estilo.logoutBtn} onClick={cerrarSesion}>
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}