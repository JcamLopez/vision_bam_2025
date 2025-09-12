export type FormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    columns?: number;
    rows?: number;
    gap?: string;
    className?: string;
   
    method?: 'post' | 'get';
};