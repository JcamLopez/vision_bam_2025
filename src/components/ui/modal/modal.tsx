'use client'

import React from 'react';
import estilo from './modal.module.css';

interface ConfirmModalProps {
  visible: boolean;
  mensaje: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  mensaje,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!visible) return null;

  return (
    <div className={estilo.overlay}>
      <div className={estilo.modal}>
        <p className={estilo.mensaje}>{mensaje}</p>
        <div className={estilo.botones}>
          <button className={estilo.cancelar} onClick={onCancel}>
            Cancelar
          </button>
          <button className={estilo.confirmar} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}