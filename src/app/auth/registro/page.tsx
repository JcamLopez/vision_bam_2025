
import estilo from './estilo.module.css'
import Registro from '@/components/usuario/registro'
function Page() {
    return (
        <div className={estilo.container}>
            <Registro />
        </div>
    )
}

export default Page
