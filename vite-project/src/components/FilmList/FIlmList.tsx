import { Card, CardActionArea, CardContent, CardMedia, Skeleton } from '@mui/material'
import styles from './FilmList.module.scss'
import { useEffect, useState } from 'react'
import { getPopularFilmsData, getTopRatedFilmsData } from '../../API/FilmServices'
import { FilmInterface, useFilmContext } from '../../context/FilmContext'
import { NavLink } from 'react-router-dom'
import mapFilmsFromServer from '../../lib/mapFilmsFromServer'
import { FilterStateInterface, useFilterContext } from '../../context/FilterContext'

const filterFilmsByGenre = (films: FilmInterface[], filterState: FilterStateInterface): FilmInterface[]  => {
    const genresIdArray = filterState.genre.map(genre => genre.id);

    let filteredArray = [...films];

    if (filterState.genre.length) {
        filteredArray = films.filter(film => 
            film.genre.some((genreId: number) => genresIdArray.includes(genreId))
        )
    }
    return  filteredArray;
}

const filterFilmsByYear = (films: FilmInterface[], filterState: FilterStateInterface): FilmInterface[] => {
    return films.filter(film => film.date >= filterState.date[0] && film.date <= filterState.date[1]);   
}

export default function FilmsList() {
    const { filmState, dispatch } = useFilmContext()
    const [ loading, setLoading ] = useState<boolean>(true)
    const { filterState } = useFilterContext()

    const updateFilmList = async () => {
        let data;

        if(filterState.sort === 'popular') {
            data = await getPopularFilmsData(filterState.page)
        } else {
            data = await getTopRatedFilmsData(filterState.page)
        }

        console.log(data)
        const filmsArray = mapFilmsFromServer(data)
   
        let filteredFilms = filterFilmsByGenre(filmsArray, filterState);
        filteredFilms = filterFilmsByYear(filteredFilms, filterState);        

        dispatch({
            type: 'setFilms',
            payload: filteredFilms,
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await updateFilmList()
            setLoading(false)
        }
        fetchData()
    }, [filterState])

    console.log(filmState)

    const listItems = filmState && filmState.map(film => 
        <li key={film.id}>
            <NavLink to={`/films/${film.id}`}>
            <Card sx={{ width: 296 }}>
                <CardActionArea>
                <CardMedia sx={{ height: 240 }} image={`https://image.tmdb.org/t/p/original${film.image}`}/>
                    <CardContent sx={{ height: 84 }}>
                        <div className={styles.info}>
                            <h4 className={styles.title}>{film.name}</h4>
                            <p className={styles.rate}>Рейтинг: {Math.floor(film.rate)}</p>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            </NavLink>
        </li>
    )

    return (
        <ul className={styles.list}>
            { loading ?  <SkeletonList/> : listItems }
        </ul>
    );
}

function SkeletonList() {
    return(
        <ul className={styles.list}>
            <Skeleton variant="rectangular" width={296} height={324}/> 
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
            <Skeleton variant="rectangular" width={296} height={324}/>
        </ul>
    )
}