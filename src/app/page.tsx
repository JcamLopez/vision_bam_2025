import Card from '@/components/ui/card/card'
import style from './page.module.css'


export default function Page() {
  return (
    <div className={style.padre}>
      {/* Encabezado del colegio */}
      <div className={style.colegio}>
        <div className={style.slogan}>
          <h1>Aprender aquí es crecer sin límites</h1>
        </div>

        <div className={style.busqueda}>
          <ul>
            <li><a href="http://localhost:3000/auth/login">Iniciar Sesión</a></li>
            <li><a href="http://localhost:3000/auth/registro">Registro</a></li>
          </ul>
        </div>

        <div className={style.medio}>
          <img src="/img/escudo_bam.png" alt="Escudo BAM" />
        </div>

        <div className={style.medio2}>
          <h1>Bernardo Arango Macías</h1>
        </div>
      </div>

      {/* Cuerpo principal */}
      <div className={style.index}>
        {/* Menú lateral izquierdo */}
        <aside className={style.menu}>
          <ul>
            <li><a href="http://localhost:3000/auth/mision_y_vision">Misión</a></li>
            <li><a href="http://localhost:3000/auth/mision_y_vision">Visión</a></li>
            <li><a href="http://localhost:3000/auth/Nosotros">Nosotros</a></li>
            <li><a href="https://iebam.edu.co/wp-content/uploads/2020/10/manual-de-convivencia.pdf" target="_blank" rel="noreferrer">Manual</a></li>
          </ul>
        </aside>

        {/* Publicaciones */}
        <section className={style.publicacion}>
          <h1 className={style.tituloPublicaciones}>Publicaciones</h1>

          {/* Sección de videos */}
          <div className={style.seccionVideos}>
            <h2>Videos</h2>
            <div className={style.contenedorVideos}>
              <video controls>
                <source src="/videos/ejemplo.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
              <video controls>
                <source src="/videos/ejemplo2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Sección de textos */}
          <div className={style.seccionTextos}>
            <h2>Noticias y Comunicados</h2>
            <div className={style.contenedorTextos}>
              <article>
                <h3>Proyecto de innovación educativa</h3>
                <p>Los estudiantes de media técnica participaron en un proyecto de desarrollo de software enfocado en soluciones educativas reales.</p>
              </article>

              <article>
                <h3>Campaña ambiental institucional</h3>
                <p>El grupo ecológico de la institución lideró una campaña de recolección de residuos y concienciación ambiental en la comunidad.</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}