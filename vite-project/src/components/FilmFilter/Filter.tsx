import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './Filter.module.scss'
import Sort from './Sort/Sort'
import { useFilterContext } from '../../context/FilterContext'
import PaginationFilm from './Pagination/Pagination'
import SortGenres from './SortGenres/SortGenres'
import SliderDate from './Slider/SliderDate'

export default function Filter() {
    const { dispatch } = useFilterContext()

    const handleReset = () => {
        dispatch({
            type: 'resetFilter',
        })
    }

    return(
        <form className={styles.form}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Фильтры</h3>
                    <IconButton onClick={handleReset}>
                        <CloseIcon/>
                    </IconButton>
                </div>


                <Sort/>
                <SliderDate/>
                <SortGenres/>
            </div>
            
            <PaginationFilm/>
        </form>
    )
}