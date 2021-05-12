import styles from './styles.module.scss';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

export function Header() {
    const [showMenu, setshowMenu] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const userContext = useContext(UserContext); 

    const handleMenuToggle = () => {
        setshowMenu(!showMenu);
    }

    const handleUserOptions = () => {
        setShowUserOptions(!showUserOptions);
    }

    const handleUserSection = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    useEffect(() => {
        userContext.signIn(JSON.parse(localStorage.getItem('user')));
    }, []);

    useEffect(() => {}, [showMenu, showUserOptions]);

    return (
        <header>
            <div className={ styles.headerContainer }>
                <h2><a href="index.html">Mi Libre</a></h2>

                <div className={ showMenu ? `${styles.menuToggle} ${styles.on}` : styles.menuToggle } onClick={handleMenuToggle}>
                    <div className={ styles.one }></div>
                    <div className={ styles.two }></div>
                    <div className={ styles.three }></div>
                </div>
                <div className={ showMenu ? `${styles.menuSection} ${styles.on}` : styles.menuSection }>
                    <nav>
                        <ul className={ styles.menu }>
                            <li><a href="/">Home</a></li>
                            <li><a href="books">Libros</a></li>
                            <li><a href="forum">Forum</a></li>
                            <li><a href="chat">Chat</a></li>
                        </ul>
        
                        {(userContext.user === null)
                            ? (
                                <ul className={ styles.menuUser }>
                                    <li><a href="login">Login</a></li>
                                    <li><a href="register">Registrarse</a></li>
                                </ul>
                            ) : (
                                <div>
                                    <ul className={styles.menuUserLogin}>
                                        <li><button className={styles.avatar} onClick={handleUserOptions} onBlur={handleUserOptions}><img src={userContext.user.photo} alt="avatar" /></button></li>
                                    </ul>
                                    <ul className={showUserOptions ? `${styles.userOptions} ${styles.on}` : styles.userOptions}>
                                        <li><a href="profile">Ver Perfil</a></li>
                                        <li><a href='/ ' onClick={handleUserSection}>Salir</a></li>
                                    </ul>
                                </div>
                            )
                        }
                    </nav>
                </div>
            </div>
        </header>
    );
}