import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBook() {
    return(
        <section className={styles.searchBook}>
            <h2>Encuentra tu libro</h2>
            <form action="#">
                <input type="search" name="" id="" placeholder="Buscar..." />
                <button className={styles.btnSearch} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </section>
    );
}