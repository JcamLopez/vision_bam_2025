"use client";
import { useState } from "react";
import style from "./page.module.css";

export default function Page() {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className={style.padre}>
      {/* Encabezado del colegio */}
      <div className={style.colegio}>
        <div className={style.slogan}>
          <h1>Aprender aquí es crecer sin límites</h1>
        </div>

        <div className={style.busqueda}>
          <ul>
            <li><a href="/auth/login">Iniciar Sesión</a></li>
            <li><a href="/auth/registro">Registro</a></li>
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
        {/* Menú lateral */}
        <aside className={style.menu}>
          <ul>
            <li><a href="/auth/mision_y_vision">Misión</a></li>
            <li><a href="/auth/mision_y_vision">Visión</a></li>
            <li><a href="/auth/Nosotros">Nosotros</a></li>
            <li><a href="https://iebam.edu.co/wp-content/uploads/2020/10/manual-de-convivencia.pdf" target="_blank">Manual</a></li>
          </ul>
        </aside>

        {/* Publicaciones */}
        <section className={style.publicacion}>
          <h1 className={style.tituloPublicaciones}>Publicaciones</h1>

          {/* Tabs */}
          <div className={style.tabs}>
            <button
              className={`${style.tabButton} ${activeTab === "videos" ? style.activeTab : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              Galería Multimedia
            </button>
            <button
              className={`${style.tabButton} ${activeTab === "textos" ? style.activeTab : ""}`}
              onClick={() => setActiveTab("textos")}
            >
              Noticias y Comunicados
            </button>
          </div>

          {/* Contenido de tabs */}
          {activeTab === "videos" ? (
            <div className={style.columnMultimedia}>
              <div className={style.card}>
                <img src="/img/img1.png" alt="Evento escolar" />
                <div className={style.fecha}>📅 Publicado: 8 de octubre de 2025</div>
              </div>
              <div className={style.card}>
                <img src="/img/img2.png" alt="Evento escolar" />
                <div className={style.fecha}>📅 Publicado: 8 de octubre de 2025</div>
              </div>
               <div className={style.card}>
                <img src="/img/img4.png" alt="Evento escolar" />
                <div className={style.fecha}>📅 Publicado: 8 de octubre de 2025</div>
              </div>
              <div className={style.card}>
                <img src="/img/img3.png" alt="Evento escolar" />
                <div className={style.fecha}>📅 Publicado: 8 de octubre de 2025</div>
              </div>
              <div className={style.card}>
                <video controls>
                  <source src="/videos/video1.mp4" type="video/mp4" />
                </video>
                <div className={style.fecha}>📅 Publicado: 15 de octubre de 2025</div>
              </div>

              <div className={style.card}>
                <video controls>
                  <source src="/videos/video2.mp4" type="video/mp4" />
                </video>
                <div className={style.fecha}>📅 Publicado: 10 de octubre de 2025</div>
              </div>


            </div>
          ) : (
            <div className={style.columnTextos}>
              <article className={style.cardTexto}>
                <h3>Proyecto Media Técnica</h3>
                <p>
                  Los estudiantes de Media Técnica nos enorgullecemos en presentar nuestro proyecto, fruto del esfuerzo, la dedicación y la pasión por la innovación tecnológica. Este trabajo refleja nuestro compromiso con la aplicación de los conocimientos adquiridos para desarrollar soluciones reales que contribuyan al crecimiento educativo y social de nuestra comunidad.
                </p>
                <p>
                  Asimismo, nos llena de satisfacción anunciar la creación de nuestras redes sociales, espacios en los que compartimos nuestros avances, aprendizajes y logros como una comunidad académica comprometida con el futuro digital.
                </p>
                <p>
                  Los invitamos cordialmente a conocer y seguir nuestras redes, donde continuaremos mostrando nuestras experiencias, proyectos e iniciativas que demuestran que aprender con propósito transforma realidades.
                </p>
                <p><strong>📱 Instagram:</strong> @bam_tec_digital</p>
                <div className={style.fecha}>📅 Publicado: 14 de octubre de 2025</div>
              </article>


            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className={style.footer}>
        <p>© 2025 Institución Educativa Bernardo Arango Macías — Todos los derechos reservados.</p>
        <p>Desarrollado por Media Técnica BAM Digital 💻</p>
      </footer>
    </div>
  );
}