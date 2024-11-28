import { Pagination } from "@mui/material"
import { useFilterContext } from "../../../context/FilterContext"

export default function PaginationFilm() {
    const { filterState, dispatch } = useFilterContext()

    const handleChangePage = (_: unknown, page: number) => {
      dispatch({
        type: 'setPage',
        payload: page
      })
    }

    return(
    <div>
      <Pagination count={5} color="primary" onChange={handleChangePage} page={filterState.page}/>
    </div>
    )
}