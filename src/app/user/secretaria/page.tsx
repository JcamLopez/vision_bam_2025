
'use client'
import estilo from './estilo.module.css'
import Button from '@/components/ui/button/boton'
import { useEffect } from 'react'


function Page() {

    useEffect(() => {
      console.log("HOLA")
    }, [])

    return (
        <>

            <div className={`container card  ${estilo.card_solicitudes}`}>

                <img src="/img/avatar_colegio2.png" alt="" />

                <h3><strong>Número de documento:</strong> 123456789</h3>
                <h3><strong>Nombres:</strong> Juan Camilo</h3>
                <h3><strong>Apellidos:</strong> Pérez</h3>
                <h3><strong>Género:</strong> Mascuh3no</h3>
                <h3><strong>Correo electrónico:</strong> juan@example.com</h3>
                <h3><strong>Teléfono:</strong> 3101234567</h3>
                <h3><strong>Rol:</strong> Usuario</h3>
                <h3><strong>Departamento:</strong> Caquetá</h3>
                <h3><strong>Municipio:</strong> Florencia</h3>
                <h3><strong>Barrio:</strong> La Estrella</h3>
                <h3><strong>Dirección:</strong> Calle 10 #5-20</h3>
                <h3><strong>Grado:</strong> Calle 10 #5-20</h3>

                <h2>Datos del acudiente</h2>
                <h3><strong>Número de documento:</strong> 123456789</h3>
                <h3><strong>Nombres:</strong> Juan Camilo</h3>
                <h3><strong>Correo electrónico:</strong> juan@example.com</h3>
                <h3><strong>Teléfono:</strong> 3101234567</h3>
                <h3><strong>Departamento:</strong> Caquetá</h3>
                <h3><strong>Municipio:</strong> Florencia</h3>
                <h3><strong>Barrio:</strong> La Estrella</h3>
                <h3><strong>Dirección:</strong> Calle 10 #5-20</h3>
                <h3><strong>Apellidos:</strong> Pérez</h3>

                <textarea placeholder='Ingrese el mensaje que desea enviarle al usuario'>Su solicitud de registro como @rol ha sido aceptado, ya puede ingresar a la plataforma con las credenciales credas. Receurde que su usuario es su numero de documento y la contraseña usted mismo la creo cuando solicito el registro.
                    ingrese atraves nuestra pagina principal http://localhost:3000.
                </textarea>

                <div className={`${estilo.btn_containt_solicitudes}`}>
                    <Button nombre='Rechazar' className={`${estilo.btn_solicitud}`} />
                    <Button nombre='Aceptar' className={`${estilo.btn_solicitud}`} />
                </div>

            </div>




        </>

    )
}

export default Page
