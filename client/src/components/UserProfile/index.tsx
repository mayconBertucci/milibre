import styles from './styles.module.scss';

import { UserContext } from '../../contexts/UserContext';
import { FormEvent, useContext, useState } from 'react';

export default function UserProfile() {
    const userContext = useContext(UserContext);
    const [data, setData] = useState<File>();
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);

    const handleShowUpdatePhoto = () => {
        setShowUpdatePhoto(!showUpdatePhoto);
    }

    const onSubmit = async () => {
        const response = await fetch(`http://localhost:3333/upload/${userContext.user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });

        const parsedRes = await response.json();
    }

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
        onSubmit();
    };

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <section className={styles.aside}>
                    <div className={styles.user}>
                       <a href="#" onClick={handleShowUpdatePhoto} onBlur={handleShowUpdatePhoto}>
                            <img src={userContext.user.photo.length > 0 ? userContext.user.photo : "img/profile-avatar.svg"}alt="avatar" />
                            <form method="POST" className={showUpdatePhoto ? `${styles.updatePhoto} ${styles.on}` : styles.updatePhoto}>
                                <label htmlFor="file">Actualizar foto</label>
                                <input type="file" name="file" id="file" onChange={e => onChange(e)} />
                            </form>
                       </a>
                        <h3>{userContext.user.name}</h3>
                    </div>
                </section>
                <div className={styles.sectionRight}>

                </div>
            </div>
        </div>
    );
}