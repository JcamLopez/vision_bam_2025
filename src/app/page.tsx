import Card from '@/components/ui/card/card'
import style from './page.module.css'

export default function Page() {
  return (
    <div className={style.padre}>
      <div className={style.colegio}>
              <div className={style.slogan}>
      </div>
      <div className={style.busqueda}>
        <ul>
          <li>Iniciar Sesion</li>
          <li>Registro</li>
        </ul>
      </div>
        <div className={style.medio}><img src="./img/escudo_bam.png" alt="" /></div>
        <div className={style.medio2}>
          <h1>Bernardo Arango Macias</h1>
        </div>
        
      </div>
    </div>
  )
}
