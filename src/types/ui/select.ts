import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectProps = {
  label?: string;
  name: string;
  options: SelectOption[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export type SelectipoDocumento = {
  label: string;
  value: string;
};

export type SelectGenero= {
  label: string;
  value: string;
};

export type SelectRol= {
  label: string;
  value: string;
};

export type SelectDepartamento = {
  label: string;
  value: number;
};

export type SelectMunicipio = {
  label: string;
  value: number;
};

export type SelectFormacion = {
  label: string;
  value: number;
};


export type SelectEscalafon = {
  label: string;
  value: number;
};


export type SelectNivelSalarial = {
  label: string;
  value: number;
};


export type SelectNivelAcademico = {
  label: string;
  value: number;
};
