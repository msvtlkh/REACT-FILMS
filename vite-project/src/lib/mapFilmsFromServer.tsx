import { FilmInterface } from "../context/FilmContext"

interface ApiFilmInterface {
    original_title: string
    vote_average: number
    poster_path: string
    id: number,
    genre_ids: number[],
    release_date: string
}

const mapFilmsFromServer = function (data: Array<any>) : FilmInterface[] {
    const result = data.results

    const film = result.map((film: ApiFilmInterface) => ({
        name: film.original_title,
        rate: film.vote_average,
        image: film.poster_path,
        id: film.id,
        genre: film.genre_ids,
        date: new Date(film.release_date).getFullYear()
    }))

    return film
}

export default mapFilmsFromServer