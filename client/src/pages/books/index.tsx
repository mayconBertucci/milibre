import styles from './styles.module.scss';

import SearchBook from '../../components/SearchBook'
import { CardBook } from '../../components/CardBook';

function Books() {
    return(
        <div className={styles.bookContainer}>
            <SearchBook />
            <CardBook />
        </div>
    );
}

export default Books;