import { FormProps } from '@/types/ui/forms';


export default function Form({
    onSubmit,
    children,
    columns = 1,
    rows,
    gap = '1rem',
    className = '',
    method = 'post'
}: FormProps) {
    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: rows ? `repeat(${rows}, auto)` : undefined,
        gap,
    };

    return (
        <form
            onSubmit={onSubmit}
            className={className}

            method={method}
            style={gridStyle}
        >
            {children}
        </form>
    );
}

