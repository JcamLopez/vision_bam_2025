import Card from '@/components/ui/card/card'
import estilo from './estilo.module.css'
import Input from '@/components/ui/input/campos'
import Boton from '@/components/ui/button/boton'

export default function page() {
  return (
    <div className={estilo.padre} >
      <div className={estilo.fondo}><img src="/img/colegio2.jpg" alt="cargando" /></div>
      <div className={estilo.contenedor_login}>
        <div className={estilo.login_img}><img src="/img/login.png" alt="cargando" /></div>
        <h2>Iniciar Sesión</h2>
        <div className={estilo.login}>
          <Input label='usuario' name='Usuario' type='text' placeholder='Usuario' />
          <Input label='contraseña' name='Contraseña' type='text' placeholder='Contraseña'/>
          <Boton nombre="Iniciar Sesión"className={estilo.Iniciar}/>
        </div>
      </div>
    </div>
  )
}
