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

export function RegisterForm() {
    const [data, setData] = useState<IAuthUser>();
    const [isValid, setIsValid] = useState(true);
    
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleIsValid = () => {
        if (data !== undefined) {
            if (data.name !== undefined && data.email !== undefined && data.password !== undefined) {
                if (data.name.length > 0 && data.email.length > 0 && data.password.length > 0) {
                    setIsValid(true);
                    window.location.href = '/registerData'
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
            <div className={styles.wrapper}>
                <form method="POST">
                    <h2>Registrarse</h2>
                    <span className={!isValid ? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>
                    <input type="text" required name="name" placeholder="Nombre" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    <input type="email" required name="email" placeholder="E-mail" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    <input type="password" required name="password" placeholder="Contraseña" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    
                    <input type="button" value="Registrarse" onClick={handleIsValid} />
                </form>
                <div className={styles.aside}>
                    <img src="img/reading_time_gvg0.svg" alt="img-register" />
                </div>
            </div>
        </div>
    );
}