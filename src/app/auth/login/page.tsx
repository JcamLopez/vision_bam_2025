
'use client'
import estilo from './estilo.module.css'
import Input from '@/components/ui/input/campos'
import Boton from '@/components/ui/button/boton'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginPayload, loginSchema } from '@/schemas/loginSchema'
import { loginCliente } from '@/services/frontend/loginServices'
export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginPayload>({
    resolver: zodResolver(loginSchema),
  });
  useEffect(() => {
    console.log("Errores actuales:", errors);
  }, [errors]);


  const onSubmitForm = async (datos: loginPayload) => {
    try {
      const res = await loginCliente(datos);

      const usuario = res?.resultado?.usuario;

      if (!usuario || usuario.estado !== 1) {
        throw new Error("Credenciales inválidas o usuario no encontrado");
      }

      

      console.log("Inicio de sesión exitoso:");
    } catch (error: any) {
      console.error("Error inesperado en el login:", error.message || error);
    }
  };

  return (
    <div className={estilo.padre} >

      <div className={estilo.fondo}><img src="/img/colegio2.jpg" alt="cargando" /></div>
      <div className={estilo.contenedor_login}>
        {/*  <div className={estilo.login_img}><img src="/img/escudo_login.png" alt="cargando" /></div>  */}
        <div className={estilo.login_img}><img src="/img/avatar_colegio.jpeg" alt="cargando" /></div>
        <h2>Iniciar Sesión</h2>
        <div className={estilo.login}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Input label='Usuario' name='usuario' type='text' placeholder='Usuario' register={register('usuario')} />
            <Input label='Contraseña' name='clave' type='password' placeholder='Contraseña' register={register('clave')} />
            <Boton nombre="Iniciar Sesión" className={estilo.Iniciar} type="submit" />
          </form>

        </div>
      </div>
    </div>
  )
}
