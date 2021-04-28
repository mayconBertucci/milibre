import { faBook, faMapMarkerAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface IBook {
    id: string,
    name: string,
    author: string,
    isbn: string,
    year: Date,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number
}

interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    birthday: Date,
    photo: string,
    location: string,
    user_note: number,
    points: string,
    favorite_book: string,
    current_book: string,
    favorite_author: string,
}

export function CardBook() {
    const [data, setData] = useState<IBook[]>([]);
    const [user, setUser] = useState<IUser>();
 
    const getData = async () => {
        const response = await fetch('http://localhost:3333/books', {
            method: 'GET',
        });

        const parsedRes = await response.json();
        setData(parsedRes);
    }

    const getUser = async (id: string) => {
        const response = await fetch(`http://localhost:3333/users/${id}`, {
            method: 'GET',
        }); 

        const parsedRes = await response.json();
        console.log(parsedRes);
        setUser(parsedRes);
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
                                <img src={element.photo} alt="Imagen del libro" className={styles.photo} />
                            </div>
                            <div className={styles.carBody}>
                                <h2>{element.name}</h2>
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
                                            {getUser(element.id)}
                                            <td>{user.name}</td>
                                            <td>{user.location}</td>
                                            <td>{element.book_status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={styles.notes}>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <th>Libro: </th>
                                            <td>
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Usuario: </th>
                                            <td className={styles.stars}>
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
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
