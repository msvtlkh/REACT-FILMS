import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './FilmInfo.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { getFilmCredits, getFilmDetails } from '../../../API/FilmServices';
import { useEffect, useState } from 'react';

interface InfoInterface {
    title: string
    poster_path: string
    genres: string
    origin_country: string
    release_date: number
    runtime: number
}

interface GenreInterface {
    name: string
}

interface CreditsInterface {
    cast: {
        name: string
    }[]
}

export default function FilmInfo() {
    const [ details, setDetails ] = useState<InfoInterface | null>(null)
    const [ credits, setCredits ] = useState<CreditsInterface | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const goToHomePage = () => {
        navigate('/')
    }

    const updateFilmInfo = async (id: string | undefined) => {
        if (!id) {
            console.error("ID is required");
            return;
        }
        const checkedId = Number(id);
        
        const data = await getFilmDetails(checkedId)
        const data2 = await getFilmCredits(checkedId)

        const date = new Date(data.release_date)
        const year = date.getFullYear()

        const genres = data.genres.map((genre: GenreInterface) => genre.name).join(', ')
        const cast = data2.cast.slice(0, 5)

        const newDetails = {
            title: data.title,
            poster_path: data.poster_path,
            genres: genres,
            origin_country: data.origin_country,
            release_date: year,
            runtime: data.runtime,
        }

        const newCredits = {
            cast: cast
        }

        setDetails(newDetails)
        setCredits(newCredits)
    }

    useEffect(() => {
        updateFilmInfo(id)
    }, [id])

    const ListItem = credits?.cast.map((actor, index) => 
        <li className={styles.item} key={index}>{actor.name}</li>
    )

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img src={`https://image.tmdb.org/t/p/original${details?.poster_path}`} className={styles.photo}/>
            </div>

            <div className={styles.info}>
                <h4 className={styles.title}>{`${details?.title} (${details?.release_date})`}</h4>

                <IconButton onClick={goToHomePage}>
                    <ArrowBackIcon fontSize='large'/>
                </IconButton>

                <ul>
                    {ListItem}
                </ul>

                <h5 className={styles.details}>Детали</h5>
                <p>{`Страна: ${details?.origin_country}`}</p>
                <p>{`Год: ${details?.release_date}`}</p>
                <p>{`Жанры: ${details?.genres}`}</p>
                <p>{`Время: ${details?.runtime}мин`}</p>
            </div>
        </div>
    )
}