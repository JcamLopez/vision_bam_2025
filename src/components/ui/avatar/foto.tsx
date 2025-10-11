import { AvatarUploadProps } from '@/types/ui/avatar'

import { useRef, useState } from 'react';
import styles from './avatar.module.css'

export default function     Avatar({ initialSrc }: AvatarUploadProps) {

    const [imageSrc, setImageSrc] = useState(initialSrc || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles["avatar-upload-container"]} onClick={handleClick}>
            <img
                src={imageSrc || '/img/avatar_colegio.jpeg'}
                alt="Foto de perfil"
                className={styles["avatar-image"]}
            />
            <div className={styles["avatar-overlay"]} >Cambiar foto</div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleChange} style={{ display: 'none' }} />

        </div>

    );
}
