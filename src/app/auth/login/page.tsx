
'use client'

import estilo from './estilo.module.css'
import Input from '@/components/ui/input/campos'
import Boton from '@/components/ui/button/boton'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { loginPayload, loginSchema } from '@/schemas/loginSchema'
import { loginCliente, UsuarioAutenticado } from '@/services/frontend/loginServices'
import { useRouter } from "next/navigation";


export default function Page() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<UsuarioAutenticado | null>(null)
  const [errorLogin, setErrorLogin] = useState<string | null>(null)
   const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPayload>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmitForm = async (datos: loginPayload) => {
    setErrorLogin(null)
    try {
      const res = await loginCliente(datos)
      const usuario = res?.resultado?.usuario
   
      if (!usuario || usuario.estado !== 'ACTIVO') {
        throw new Error("Credenciales inválidas o usuario no encontrado")
      }

      localStorage.setItem('usuario', JSON.stringify(usuario))
      setUsuarioAutenticado(usuario)
      console.log("Inicio de sesión exitoso:", usuario)
      if (usuario.rol == 'SECRETARIA') {
        router.push('/user/secretaria')
      }else if(usuario.rol == 'DOCENTE'){
        router.push('/user/docente')
      }else if(usuario.rol == 'RECTOR'){
    router.push('/user/rector')
      }else if(usuario.rol == 'ESTUDIANTE'){
        router.push('/user/estudiante')
      }else if(usuario.rol == 'COORDINADOR'){
        router.push('/user/coordinador')
      }


    } catch (error: any) {
      setErrorLogin(error.message || "Error inesperado")
      console.error(" Error en login:", error.message || error)
    }
  }

  return (
    <div className={estilo.contenedor}>
      <div className={estilo.fondo}></div>

      <div className={estilo.tarjeta}>
        <img src="/img/avatar_colegio.jpeg" alt="Logo" className={estilo.logo} />
        <h2 className={estilo.titulo}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className={estilo.formulario}>
          <Input
            label='Usuario'
            name='usuario'
            type='text'
            placeholder='Ingresa tu usuario'
            register={register('usuario')}
          />
          {errors.usuario && <p className={estilo.error}>{errors.usuario.message}</p>}

          <Input
            label='Contraseña'
            name='clave'
            type='password'
            placeholder='Ingresa tu contraseña'
            register={register('clave')}
          />
          {errors.clave && <p className={estilo.error}>{errors.clave.message}</p>}

          {errorLogin && <p className={estilo.error}>{errorLogin}</p>}

          <Boton
            nombre="Iniciar Sesión"
            className={estilo.boton}
            type="submit"
          />
        </form>


      </div>
    </div>
  )
}
