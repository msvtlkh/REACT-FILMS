import { createContext, useContext, useReducer } from "react"
import { GenreInterface } from "../components/FilmFilter/SortGenres/SortGenres"

export const FilterContext = createContext<FilterContextInterface | null>(null)

export interface FilterStateInterface {
    sort: 'top-rated' | 'popular' 
    page: number,
    genre: GenreInterface[]
    date: number[]
}

interface FilterContextInterface {
    filterState: FilterStateInterface
    dispatch: React.Dispatch<Action>
}

type Action = 
    | { type: 'setSort', payload: 'top-rated' | 'popular' }
    | { type: 'setPage', payload: number}
    | { type: 'setGenres', payload: GenreInterface[] }
    | { type: 'setData', payload: number[]}
    | { type: 'resetFilter' }

function filterReducer(state: FilterStateInterface, action: Action) {
    switch (action.type) {
        case 'setSort': {
            return {...state, sort: action.payload}
        }
        case 'setPage': {
            return {...state, page: action.payload}
        }
        case 'setGenres': {
            return {...state, genre: action.payload}
        }
        case 'setData': {
            return {...state, date: action.payload}
        }
        case 'resetFilter': {
            return { sort: 'popular', page: 1, genre: [{name: 'боевик', id: 28}]}
        }
        default: return state;
    }
}

export function FilterContextProvider ({children} : {children: React.ReactNode}) {
    const [ filterState, dispatch ] = useReducer(filterReducer, { sort: 'popular', page: 1, genre: [{ name: 'боевик', id: 28 }], date: [1987, 2024] } as FilterStateInterface)

    return(
        <FilterContext.Provider value={{ filterState, dispatch }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilterContext() {
    const context = useContext(FilterContext)

    if(!context) throw new Error('Please use context inside provider')

    return context
}

