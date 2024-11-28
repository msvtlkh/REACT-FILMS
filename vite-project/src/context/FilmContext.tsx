import { createContext, useContext, useReducer } from "react"

export const FilmContext = createContext<FilmContextInterface | null>(null)

export interface FilmInterface {
    name: string
    rate: number
    image: string
    id: number
    genre: number[]
    date: number
}

interface FilmContextInterface {
    filmState: FilmInterface[]
    dispatch: React.Dispatch<Action>
}

type Action = 
    | { type: 'setFilms', payload: FilmInterface[] }

function filmReducer(state: FilmInterface[], action: Action) {
    switch (action.type) {
        case 'setFilms': {
            return action.payload
        }
    }
}

export function FilmContextProvider ({children} : {children: React.ReactNode}) {
    const initialState: FilmInterface[] = [{
        name: 'untitled',
        rate: 0,
        image: '',
        id: 0,
        genre: [],
        date: 0
    }]

    const [ filmState, dispatch ] = useReducer(filmReducer, initialState)

    return(
        <FilmContext.Provider value={{ filmState, dispatch }}>
            {children}
        </FilmContext.Provider>
    )
}

export function useFilmContext() {
    const context = useContext(FilmContext)

    if(!context) throw new Error('Please use context inside provider')

    return context
}

