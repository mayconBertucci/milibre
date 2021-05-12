import SearchBook from '../../components/SearchBook'
import { CardBook } from '../../components/CardBook';

import styles from './styles.module.scss';

function Books() {
    return(
        <div className={styles.bookContainer}>
            <SearchBook />
            <CardBook />
        </div>
    );
}

export default Books;