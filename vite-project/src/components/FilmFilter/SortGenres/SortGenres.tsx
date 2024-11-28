import { Autocomplete, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getGenres } from "../../../API/FilmServices";
import { useFilterContext } from "../../../context/FilterContext"

export interface GenreInterface {
    name: string
    id: number
}

export default function SortGenres() {
    const { filterState, dispatch } = useFilterContext()
    const [ genres, setGenres ] = useState<GenreInterface[]>([])

    const onSelect = (_, value: GenreInterface[]) => dispatch({ type: 'setGenres', payload: value })

    const fetchData = async() => {
        const data = await getGenres()
        const genresList = data.genres.map((genre: GenreInterface) => ({ name: genre.name, id: genre.id }))
        setGenres(genresList)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <Stack sx={{ width: 258, marginTop: 2 }} >
        <Autocomplete
          multiple
          id="tags-standard"
          options={genres}
          getOptionLabel={(option) => option.name}
          value={filterState.genre}
          onChange={onSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              variant="standard"
              label="Жанры"
            />
          )}
        />
        </Stack>
    )
}

