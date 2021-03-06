import styles from './styles.module.scss';

import { FormEvent, useState, useContext } from 'react';
import { UserContext } from './../../contexts/UserContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface IAuthUser {
    email: string,
    password: string
}

export function LoginForm() {
    const [data, setData] = useState<IAuthUser>();
    const userContext = useContext(UserContext);
    const router = useRouter();

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (data) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data),
            });

            const parsedRes = await response.json()
            if (parsedRes.user !== undefined) {
                localStorage.setItem('token', JSON.stringify(parsedRes.token));
                localStorage.setItem('user', JSON.stringify(parsedRes.user));
                userContext.signIn(JSON.parse(localStorage.getItem('user')));
                router.push('/');
            } else {
                toast.error(parsedRes.message);
            }
            
        } else {
            toast.error('Campos obrigatorios');
        }


    } 
    
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.aside}>
                    <img src="img/Bibliophile_hwqc.svg" alt="img-login" />
                </div>
                <form method="post">
                    <h2>Iniciar Sesi??n</h2>

                    <input type="email" name="email" placeholder="E-mail" required onChange={onChange}/>
                    <input type="password" name="password" placeholder="Contrase??a" required onChange={onChange}/>
                    <a href="#" className="recuperar-contrasena"><span>Recuperar Contrase??a</span></a>
                    <button onClick={(e: FormEvent<HTMLButtonElement>) => onSubmit(e)}>Entrar</button>
                </form>
            </div>
        </div>
    );
}