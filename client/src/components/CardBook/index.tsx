import { faBook, faMapMarkerAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { FormEvent, useContext, useEffect, useState } from 'react';


import styles from './styles.module.scss';
import { SearchDataContext } from '../../contexts/search';

interface IUser {
    name: string,
    location: string,
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

export function CardBook() {
    const [data, setData] = useState<IBook[]>([]);
    const searchData = useContext(SearchDataContext);

    const getData = async () => {
        const response = await fetch('http://localhost:3333/books', {
            method: 'GET',
        });

        const parsedRes = await response.json();
        setData(parsedRes);
    } 

    const onChange = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        searchData.setSearch(e.currentTarget.value);
        if (e.currentTarget.value.length > 0) {
            const response = await fetch(`http://localhost:3333/books-search/${e.currentTarget.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            const parsedRes = await response.json();
            setData(parsedRes);
        } else {
            getData();
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
    }, [data]);

    return(
        <>
            <section className={styles.searchBook}>
                <h2>Encuentra tu libro</h2>
                <form action="#">
                    <input type="search" name="" id="" placeholder="Buscar..." onChange={onChange} value={searchData.searchData} autoFocus />
                    <button className={styles.btnSearch} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </section>
            <div className={styles.cardsBookContainer}>
                {data.length > 0 && data.map((element) => { 
                    return(
                        <Link href="/book" key={element.id}>
                            <article className={styles.card} key={element.id}>
                                <div className={styles.cardHearder}>
                                <img src={element.photo !== null ? element.photo : 'img/Photos_re_pvh3.svg'} alt="Imagen del libro" className={styles.photo} />
                                </div>
                                <div className={styles.carBody}>
                                    <h4>{element.titol}</h4>
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
                                                <th>Nota: </th>
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
        </>
    );
}
