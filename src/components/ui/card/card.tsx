import { CardProps, Size } from '@/types/ui/card';
import styles from './card.module.css';
export default function Card({
    size = "md",
    children,
    className
}: CardProps) {

    const sizeClasses: Record<Size, string> = {
        sm: "w-25",
        md: "w-50",
        lg: "w-75",
    };
    const appliedSizeClass = className ? '' : sizeClasses[size];



    return (
        <div className={`card ${appliedSizeClass} ${className ?? ''} ${styles.card}`}  >
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}
