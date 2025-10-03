
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import style from './input.module.css'
type InputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

export default function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  register,
  error,
}: InputProps) {
  return (
    <div className={`form-group ${style.formGroup}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...register}
      />
      {error && <span className="input-error-message">{error.message}</span>}
    </div>
  );
}
