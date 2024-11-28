import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useFilterContext } from '../../../context/FilterContext';


export default function Sort() {
    const { filterState, dispatch: filterDispatch } = useFilterContext()

    const handleChange = async (event: SelectChangeEvent) => {
      const value = event.target.value
      
      filterDispatch({
        type: 'setSort',
        payload: value as 'top-rated' | 'popular'
      })
    }

    return(
        <FormControl variant='standard' sx={{ width:258 }}>
          <InputLabel>Сортировать по:</InputLabel>  
          <Select
            defaultValue='popular'
            onChange={handleChange}
            value={ filterState.sort }
          >
            <MenuItem value='popular'>Популярные фильмы</MenuItem>
            <MenuItem value='top-rated'>Топ-рейтинг</MenuItem>
          </Select>
        </FormControl>
    ) 
}