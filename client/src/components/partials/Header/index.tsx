import styles from './styles.module.scss';

export function Header() {
    return (
        <header>
            <div className={ styles.headerContainer }>
                <h2><a href="index.html">Mi Libre</a></h2>

                <div className={ styles.menuToggle }>
                    <div className={ styles.one }></div>
                    <div className={ styles.two }></div>
                    <div className={ styles.three }></div>
                </div>
                <div className={ styles.menuSection }>
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