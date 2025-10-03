import Card from '@/components/ui/card/card'
import style from './page.module.css'

export default function Page() {
  return (
    <div className={style.padre}>
      <div className={style.colegio}>
              <div className={style.slogan}>
              <h1>Aprender aquí es crecer sin límites</h1>  
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
      <div className={style.index}>
        <div className={style.menu}>
          <ul>
            <li>Misión</li>
            <li>Visión</li>
            <li>Nosotros</li>
          </ul>
        </div>
        <div className={style.publicacion}>
          <h1>aqui van las publicaciones</h1>
        </div>
        <div className={style.img_real}><img src="./img/escudo_minimalista.png" alt="" />
        <h1>BAM</h1></div>
        <div className={style.fecha}>
          <h2>00/00/0000</h2>
        </div>
      </div>
    </div>
  )
}
