import { FormProps } from '@/types/ui/forms';

import styles from './form.module.css'

export default function Form({
    onSubmit,
    children,
    className = '',
    method = 'post'
}: FormProps) {

    return (
        <form
            onSubmit={onSubmit}
            className={`${styles.formGrid} ${className}`}

            method={method}>
            {children}
        </form>
    );
}

/* export default function Form({ MIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
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
} */


/* export default function Form({ IAAAAAAAAAAAAAAAAAAAAAA
  onSubmit,
  children,
  columns = 1,
  rows = 1,
  gap = '1rem',
  className = '',
  method = 'post'
}: FormProps) {
  const styleVars: React.CSSProperties = {
    '--columns': columns,
    '--rows': rows,
    '--gap': gap,
  } as React.CSSProperties;

  return (
    <form
      onSubmit={onSubmit}
      method={method}
      className={`${styles.formGrid} ${className}`}
      style={styleVars}
    >
      {children}
    </form>
  );
}

 */