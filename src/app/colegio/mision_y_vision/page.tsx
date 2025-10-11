import Card from '@/components/ui/card/card'
import estilo from './estilo.module.css'

export default function page() {
  return (
    <div className={estilo.padre} >
      <div className={estilo.contorno}>
        <div className={estilo.mision}><img src="/img/Mision.png" alt="" />
        <h1>Misión</h1>
        <p>Contribuir al proceso de formación integral de los estudiantes de la Institución
          Educativa Bernardo Arango Macías, a través del desarrollo de las dimensiones:
          intelectual, social, corporal, espiritual, artística, afectiva y axiológica que les
          permitan fortalecer competencias intelectuales y laborales para orientar, en su
          compromiso social, la transformación de su entorno, para propiciar procesos de
          cambio y construcción de una sociedad solidaria, justa y libre, que en
          concordancia con las tendencias del mundo contemporáneo aporte soluciones alos problemas de la comunidad, mediante la aplicación del saber científico,
          y cultural. </p>
        </div>
        <div className={estilo.vision}>
          <h1>Visión</h1>
          <p>En el 2015 la Institución Educativa Bernardo Arango Macías en su compromiso
            por proporcionar una formación que fomente el desarrollo humano integral, se
            proyectará como una organización líder en el plano local, regional y nacional,
            en generar proyectos de vida sustentados en los valores que fundamentan la
            dignidad humana, la sana convivencia, la práctica del trabajo, la recreación,
            acorde con los avances culturales, científicos y tecnológicos, además de la
            relación adecuada con el medio circundante.</p>
        </div>
        <div className={estilo.pie}>
          <img src="/img/escudo_login.png" alt="" />
          <h1>Institución Educativa</h1>
          <h2>Bernardo Arango Macias</h2>
        </div>
      </div>
    </div>
  )
}
