import React from 'react'
import style from './selector.module.css'
import { SelectProps } from '@/types/ui/select'




function Selector({
    label,
    name,
    options,
    onChange,
    placeholder = 'Seleccione una opción',
    register,
    error,
}: SelectProps) {
    return (
        <div className={`form-group ${style.formGroup}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                id={name}
                className={`select-field ${error ? 'select-error' : ''}`} 
                {...register} onChange={onChange}
            >
                <option value="">{placeholder}</option>
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {error && <span className="select-error-message">{error.message}</span>}

        </div>
    )
}

export default Selector
