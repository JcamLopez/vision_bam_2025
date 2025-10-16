'use client'

import React from 'react'
import estilo from './solicitudes.module.css'
import Button from '@/components/ui/button/boton'

interface Acudiente {
  parentesco: string
  documento: string
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  direccion: string
  barrio: string
  municipio: string
  departamento: string
}

interface Solicitud {
  usuario: string
  estado: string
  documento: string
  nombres: string
  apellidos: string
  telefono: string
  genero: string
  tipoDocumento: string
  direccion: string
  barrio: string
  municipio: string
  departamento: string
  rol: string
  correo: string
  grado?: string
  acudiente?: Acudiente
  titulo?: string
  formacion?: string
  nivelSalarial?: string
  nivelAcademico?: string
  gradoEscalafon?: string
}

export function CardSolicitud({
  solicitud,
  onAceptar,
  onRechazar
}: {
  solicitud: Solicitud,
  onAceptar: (solicitud: Solicitud) => void,
  onRechazar: (solicitud: Solicitud) => void
}) {
  return (
    <div className={estilo.card_solicitudes}>
      <div className={estilo.header}>
        <img src="/img/avatar_colegio2.png" alt="Avatar" className={estilo.avatar} />
      </div>

      <h2 className={estilo.titulo}>Datos de la persona</h2>

      <div className={estilo.grid}>
        <p><strong>Número de documento:</strong> {solicitud.documento}</p>
        <p><strong>Nombres:</strong> {solicitud.nombres}</p>
        <p><strong>Apellidos:</strong> {solicitud.apellidos}</p>
        <p><strong>Género:</strong> {solicitud.genero}</p>
        <p><strong>Correo electrónico:</strong> {solicitud.correo}</p>
        <p><strong>Teléfono:</strong> {solicitud.telefono}</p>
        <p><strong>Rol:</strong> {solicitud.rol}</p>
        <p><strong>Departamento:</strong> {solicitud.departamento}</p>
        <p><strong>Municipio:</strong> {solicitud.municipio}</p>
        <p><strong>Barrio:</strong> {solicitud.barrio}</p>
        <p><strong>Dirección:</strong> {solicitud.direccion}</p>

        {solicitud.rol === 'ESTUDIANTE' && (
          <>
            <p><strong>Grado:</strong> {solicitud.grado}</p>
            <h2 className={estilo.subtitulo}>Datos del acudiente</h2>
            {solicitud.acudiente && (
              <>
                <p><strong>Parentesco:</strong> {solicitud.acudiente.parentesco}</p>
                <p><strong>Documento:</strong> {solicitud.acudiente.documento}</p>
                <p><strong>Nombres:</strong> {solicitud.acudiente.nombres}</p>
                <p><strong>Apellidos:</strong> {solicitud.acudiente.apellidos}</p>
                <p><strong>Correo:</strong> {solicitud.acudiente.correo}</p>
                <p><strong>Teléfono:</strong> {solicitud.acudiente.telefono}</p>
                <p><strong>Departamento:</strong> {solicitud.acudiente.departamento}</p>
                <p><strong>Municipio:</strong> {solicitud.acudiente.municipio}</p>
              </>
            )}
          </>
        )}

        {solicitud.rol === 'DOCENTE' && (
          <>
            <p><strong>Título:</strong> {solicitud.titulo}</p>
            <p><strong>Formación:</strong> {solicitud.formacion}</p>
            <p><strong>Nivel académico:</strong> {solicitud.nivelAcademico}</p>
            <p><strong>Nivel salarial:</strong> {solicitud.nivelSalarial}</p>
            <p><strong>Grado escalafón:</strong> {solicitud.gradoEscalafon}</p>
          </>
        )}
      </div>

      <textarea
        placeholder="Mensaje al usuario"
        className={estilo.textarea_solicitudes}
      ></textarea>

      <div className={estilo.btn_containt_solicitudes}>
        <Button nombre="Rechazar" className={estilo.btn_rechazar} onClick={() => onRechazar(solicitud)} />
        <Button nombre="Aceptar" className={estilo.btn_aceptar} onClick={() => onAceptar(solicitud)} />
      </div>
    </div>
  )
}