import styles from './boton.module.css'
import { buttonProps } from '@/types/ui/button'
function Boton({ nombre, onClick, type, className }: buttonProps) {
    return (

        <button type={type} className={`${styles.botonInstitucional} ${className}`} onClick={onClick} >
            {nombre}
        </button>
    )
}

export default Boton