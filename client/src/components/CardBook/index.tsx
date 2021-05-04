import { faBook, faMapMarkerAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface IUser {
    name: string,
    location: string,
    user_note: number,
}

interface IBook {
    id: string,
    name: string,
    author: string,
    isbn: string,
    year: Date,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number, 
    user: IUser
}

export function CardBook() {
    const [data, setData] = useState<IBook[]>([]);

    const getData = async () => {
        const response = await fetch('http://localhost:3333/books', {
            method: 'GET',
        });

        const parsedRes = await response.json();
        setData(parsedRes);
    } 

    useEffect(() => {
        getData();
    }, []);

    return(
        <section className={styles.cardsBookContainer}>
            {data.length > 0 && data.map((element) => { 
                return(
                    <article className={styles.card} key={element.id}>
                        <a href="#">
                            <div className={styles.cardHearder}>
                               <img src={`${element.photo}`} alt="Imagen del libro" className={styles.photo} />
                            </div>
                            <div className={styles.carBody}>
                                <h4>{element.name}</h4>
                                <table className={styles.bookDescription}>
                                    <thead>
                                        <tr>
                                            <th><FontAwesomeIcon icon={faUser} className={styles.icons} /></th>
                                            <th><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icons} /></th>
                                            <th><FontAwesomeIcon icon={faBook} className={styles.icons} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{element.user.name}</td>
                                            <td>{element.user.location}</td>
                                            <td>{element.book_status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={styles.notes}>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th>Libro: </th>
                                            <td className={styles.bookStarsNotActiv}>
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <div className={styles.bookStarsActiv} style={{
                                                        width: `calc(${(element.book_note * 20)}% - ${element.book_note > 0 ? (Math.floor(element.book_note - 1) * 4) : 0}px)`
                                                    }}>
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Usuario: </th>
                                            <td className={styles.userStarsNotActiv}>
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <div className={styles.userStarsActiv}>
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </a>
                    </article>
                );
            })}
        </section>
    );
}
