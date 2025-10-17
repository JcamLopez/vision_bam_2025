'use client'

import { useEffect, useState } from "react";
import { obtenerSolicitudes, actualizarEstadoUsuario } from "@/services/frontend/solicitudesServices";
import { CardSolicitud } from '@/components/usuario/solicitudes/CardSolicitud';
import EncabezadoConMenu from '@/components/ui/nav/menu';
import ConfirmModal from '@/components/ui/modal/modal';
import estilo from './estilo.module.css';

type Permiso = {
  nombre: string;
  ruta: string;
};

export default function Solicitudes() {
  const [usuario, setUsuario] = useState<any>(null);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [nombre, setNombre] = useState<string>("");

  const [tipo, setTipo] = useState<string>("docentes");
  const [solicitudes, setSolicitudes] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [accionPendiente, setAccionPendiente] = useState<'aceptar' | 'rechazar' | null>(null);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null);
  const [estado, setEstado] = useState<any>(false);

  useEffect(() => {
    setMounted(true);
    const cargarSolicitudes = async () => {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    };
    cargarSolicitudes();

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);

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

   useEffect(() => {
    const cargarSolicitudes = async () => {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    };
    cargarSolicitudes();
    setEstado(false);
  }, [estado]);


  if (!mounted) return null;

  const datos = solicitudes[tipo] || [];
  const abrirModal = (accion: 'aceptar' | 'rechazar', solicitud: any) => {
    console.log("Documento seleccionado:", solicitud.documento);
    setAccionPendiente(accion);
    setSolicitudSeleccionada(solicitud);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setAccionPendiente(null);
    setSolicitudSeleccionada(null);
  };

  const confirmarAccion = async () => {
    if (!solicitudSeleccionada || !accionPendiente) return;

    const documento = solicitudSeleccionada.documento;

    if (accionPendiente === 'aceptar') {
      console.log(`Solicitud ACEPTADA para el documento: ${documento}`);
      const actulizar_usuaruio = await actualizarEstadoUsuario(documento, "ACTIVO");
      console.log("Respuesta de la actualización:", actulizar_usuaruio);
      setEstado(true)
    } else {
      console.log(`Solicitud RECHAZADA para el documento: ${documento}`);
      const actulizar_usuaruio = await actualizarEstadoUsuario(documento, "INACTIVO");
      console.log("Respuesta de la actualización:", actulizar_usuaruio);
      setEstado(true)
    }
    cerrarModal();
  };

  const roles = [
    { id: "docentes", label: "Docentes", icon: "👩‍🏫", descripcion: "Solicitudes de docentes" },
    { id: "estudiantes", label: "Estudiantes", icon: "🎓", descripcion: "Solicitudes de estudiantes" },
    { id: "rector", label: "Rector", icon: "🎩", descripcion: "Solicitudes del rector" },
    { id: "coordinador", label: "Coordinador", icon: "🧑‍💼", descripcion: "Solicitudes de coordinación" },
    { id: "secretaria", label: "Secretaría", icon: "🧑‍💻", descripcion: "Solicitudes de secretaría" },
  ];

  return (
    <>
      <EncabezadoConMenu nombre={nombre} permisos={permisos} />

      <div className={estilo.container}>
        <h2 className={estilo.titulo}>Solicitudes Pendientes</h2>
        <p className={estilo.subtitulo}>
          Selecciona el tipo de solicitudes que deseas revisar:
        </p>

        <div className={estilo.gridRoles}>
          {roles.map((rol) => (
            <div
              key={rol.id}
              onClick={() => setTipo(rol.id)}
              className={`${estilo.cardRol} ${tipo === rol.id ? estilo.activo : ''}`}
            >
              <div className={estilo.icono}>{rol.icon}</div>
              <h3 className={estilo.rolTitulo}>{rol.label}</h3>
              <p className={estilo.descripcion}>{rol.descripcion}</p>
              <div className={estilo.estado}>
                {tipo === rol.id ? "Seleccionado" : "Haz clic para seleccionar"}
              </div>
            </div>
          ))}
        </div>

        {datos.length > 0 ? (
          <div className={estilo.listaSolicitudes}>
            {datos.map((solicitud: any, index: number) => (
              <CardSolicitud
                key={index}
                solicitud={solicitud}
                onAceptar={() => abrirModal('aceptar', solicitud)}
                onRechazar={() => abrirModal('rechazar', solicitud)}
              />
            ))}
          </div>
        ) : (
          <div className={estilo.sinSolicitudes}>
            <p>No hay solicitudes pendientes de <strong>{tipo}</strong>.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        visible={modalVisible}
        mensaje={
          accionPendiente === 'aceptar'
            ? '¿Estás seguro de aceptar esta solicitud?'
            : '¿Estás seguro de rechazar esta solicitud?'
        }
        onConfirm={confirmarAccion}
        onCancel={cerrarModal}
      />
    </>
  );
}