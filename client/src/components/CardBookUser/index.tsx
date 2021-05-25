import { faBook, faMapMarkerAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import styles from './styles.module.scss';
import { UserContext } from './../../contexts/UserContext';

interface IUser {
    name: string,
    location: string
}

interface IBook {
    id: string,
    titol: string,
    author: string,
    isbn: string,
    year: Date,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number, 
    user: IUser
}

export function CardBookUser() {
    const [data, setData] = useState<IBook[]>([]);
    const userContext = useContext(UserContext);

    const getData = async () => {
        const response = await fetch(`http://localhost:3333/books-user/${userContext.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const parsedRes = await response.json();
        setData(parsedRes);
    } 
    
    useEffect(() => {
        if (userContext.user.id.length > 0) {
            getData();
        }
    }, [userContext]);

    return(
        <>
            <div className={styles.cardsBookContainer}>
                {data.length > 0 && data.map((element) => { 
                    return(
                        <Link href="#" key={element.id}>
                            <article className={styles.card} >
                                <div className={styles.cardHearder}>
                                <img src={element.photo !== null ? element.photo : 'img/Photos_re_pvh3.svg'} alt="Imagen del libro" className={styles.photo} />
                                </div>
                                <div className={styles.carBody}>
                                    <h4>{element.titol}</h4>
                                    <table className={styles.notes}>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
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
                                        </tbody>
                                    </table>
                                </div>  
                            </article>
                        </Link>
                    );
                })}
            </div>
            {data.length === 0 && (
                <>
                    <h1 className={styles.noBooks}>Aún no tienes libros registrados</h1>
                    <h2>Registre el primer libro y gane un punto</h2>
                </>
            )}
        </> 
    );
}
