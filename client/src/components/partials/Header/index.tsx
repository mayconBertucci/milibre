import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export function Header() {
    const [showMenu, setshowMenu] = useState(false);

    const handleMenuToggle = () => {
        setshowMenu(!showMenu);
    }

    useEffect(() => {}, [showMenu]);

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
                            <li><a href="forum.html">Forum</a></li>
                            <li><a href="chat.html">Chat</a></li>
                        </ul>
                        <ul className={ styles.menuUser }>
                            <li><a href="login.html">Login</a></li>
                            <li><a href="logon.html">Registrarse</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}