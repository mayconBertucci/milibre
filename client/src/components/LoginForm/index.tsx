import styles from './styles.module.scss';

import { FormEvent, useState, useContext } from 'react';
import { UserContext } from './../../contexts/UserContext';

interface IAuthUser {
    email: string,
    password: string
}

export function LoginForm() {
    const [data, setData] = useState<IAuthUser>();
    const userContext = useContext(UserContext);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onSubmit = async () => {
        const response = await fetch('http://localhost:3333/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });

        const parsedRes = await response.json();
        if (parsedRes.user !== undefined && parsedRes.token !== undefined) {
            localStorage.setItem('token', JSON.stringify(parsedRes.token));
            localStorage.setItem('user', JSON.stringify(parsedRes.user));
            userContext.signIn(JSON.parse(localStorage.getItem('user')));
            window.location.href = '/'
        }
    } 
    
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.aside}>
                    <img src="img/Bibliophile_hwqc.svg" alt="img-login" />
                </div>
                <form method="post">
                    <h2>Iniciar Sesión</h2>

                    <input type="email" name="email" placeholder="E-mail" onChange={onChange}/>
                    <input type="password" name="password" placeholder="Contraseña" onChange={onChange}/>
                    <a href="#" className="recuperar-contrasena"><span>Recuperar Contraseña</span></a>
                    <input type="button" value="Entrar" onClick={onSubmit}/>
                </form>
            </div>
        </div>
    );
}