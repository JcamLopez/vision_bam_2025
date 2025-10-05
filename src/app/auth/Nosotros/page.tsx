import Card from '@/components/ui/card/card'
import estilo from './estilo.module.css'

export default function page() {
  return (
    <div className={estilo.padre} >
      <div className={estilo.hijo}>
                <div className={estilo.nosotros}>
            <h2>Quienes</h2>
            <h1>Somos</h1>
        </div>
        <div className={estilo.descripcion}>
          <p> <strong>El Instituto Educativo Bernardo Arango Macías</strong> es una institución comprometida 
          con la excelencia académica y la formación integral de sus estudiantes. Desde el municipio de 
           <strong> La Estrella</strong>, promueve el desarrollo del conocimiento, los valores éticos y 
          el liderazgo social, orientando a niños y jóvenes hacia una participación activa, crítica y 
          responsable en la construcción de una sociedad más justa y equitativa.</p>
        </div>
        <div className={estilo.historia}>
          <h2>Historia</h2>
          <h1>Institucional</h1>
        </div>        
        <div className={estilo.descripcion2}>
          <p>El <strong>Instituto Educativo Bernardo Arango Macías</strong> fue fundado en <strong>1972</strong> como 
          <strong>el Instituto Departamental de Enseñanza Media (IDEM)</strong> de La Estrella. 
          En <strong>2002</strong>, tras la fusión de varias escuelas del municipio, 
          adoptó su nombre actual, consolidándose como una institución que ofrece educación desde la básica 
            primaria hasta la media académica. 
            
            A lo largo de su trayectoria, se ha destacado por su compromiso con la <strong>formación integral</strong>, 
            la <strong>excelencia educativa</strong> y el <strong> desarrollo social</strong> de la comunidad estrellense.</p>
        </div>
        <div className={estilo.contactanos}>
          <a href="https://www.google.com/maps/place/Instituci%C3%B3n+Educativa+Bernardo+Arango+Mac%C3%ADas/@6.1592883,-75.6474429,17z/data=!3m1!4b1!4m6!3m5!1s0x8e46810d3a1d00eb:0x4dd3906103b9e502!8m2!3d6.159283!4d-75.644868!16s%2Fg%2F11b7q87dzt?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D" target='blank'><h1>Dirección: Cra. 63 No. 77s-105, La Estrella</h1></a>
          <h1>Teléfono general (PBX): 5604230</h1>
          <h1>Correo institucional: iebamestrella@hotmail.com</h1>
        </div>
      </div>
    </div>
  )
}