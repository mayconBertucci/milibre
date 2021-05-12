import styles from './styles.module.scss';

import { FormEvent, useState } from 'react';

interface IAuthUser {
    name: string,
    email: string,
    password: string,
    location: string,
    favorite_book: string,
    favorite_author: string,
    birthday: Date,
}

export function RegisterDataForm() {
    const [data, setData] = useState<IAuthUser>();
    const [isValid, setIsValid] = useState(true);
    
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleModal = () => {
        if (data !== undefined) {
            if (data.name !== undefined && data.email !== undefined && data.password !== undefined) {
                if (data.name.length > 0 && data.email.length > 0 && data.password.length > 0) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } else {
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
    }

    const onSubmit = async () => {
        console.log(data);
        const response = await fetch('http://localhost:3333/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const parsedRes = await response.json();
        if (parsedRes) {
            window.location.href = '/login';
        }
    } 

    return(
        <div className={styles.container}>
            <form method="POST" className={styles.wrapper}>
                <input type="text" name="location" required placeholder="Localidad..." className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                <input type="text" name="favorite_book" placeholder="Libro preferido" onChange={onChange} />
                <input type="text" name="favorite_author" placeholder="Author preferido" onChange={onChange} />
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" name="birthday" required className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                <span className={!isValid ? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>

                <div className={styles.buttonsActions}>
                    <button className={styles.cancelar} onClick={handleModal}>Cancelar</button>
                    <input type="button" className={styles.enviar} onClick={onSubmit} value="Enviar"/>
                </div>
            </form>
        </div>
    );
}