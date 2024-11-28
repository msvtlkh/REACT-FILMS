const API_BASE = 'https://api.themoviedb.org/3/movie/'
export const API_KEY = localStorage.getItem('token')
//const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjM3YzY5OTY0OWUxOGY1ZDdiMTk0ZGU4ZTcxNzUwYiIsIm5iZiI6MTczMDk4MzM1My41ODQ1OTk3LCJzdWIiOiI2Njg1NWRmODc1NDkyNmQ0ZWQzYjI4MzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1TPXCP0_gHwd6h5nZN6nimr7KO2MhIFLDF3XX7aXPm4'

const options = {method: 'GET', headers: {accept: 'application/json', Authorization: `Bearer ${API_KEY}`}};

export const fetchRequest = async (url: string) => {
    try {
        const response = await fetch(`${url}`, options)
        if(!response.ok) {
            throw new Error('Network response was not OK')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

export const getTopRatedFilmsData = (page: number) => {
    return fetchRequest(`${API_BASE}top_rated?language=en-US&page=${page}`)
}

export const getPopularFilmsData = (page: number) => {
    return fetchRequest(`${API_BASE}popular?language=en-US&page=${page}`)
}

export const getFilmDetails = (id: number) => {
    return fetchRequest(`${API_BASE}${id}?language=en-US'`)
}

export const getFilmCredits = (id: number) => {
    return fetchRequest(`${API_BASE}${id}/credits?language=en-US'`)
}

export const getGenres = () => {
    return fetchRequest('https://api.themoviedb.org/3/genre/movie/list?language=ru')
}
