
import SearchBook from './../SearchBook/index';

import styles from './styles.module.scss';

export function HomePage() {
    return (
        <div className={styles.containerHome}>
            <div className={styles.searchHome}>
                <SearchBook />
            </div>
            <section className={styles.sectionIllustration}>
                <img className={styles.illustration} src="img/book_lover_mkck.svg" alt="Book Lover" />
            </section>
        </div>
    );
}
