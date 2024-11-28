import { createRoot } from 'react-dom/client'
import './index.css'
import { CssBaseline } from '@mui/material'
import { AppRouterProvider } from './Routes/Router'
import { ModalContextProvider } from './context/ModalContext'
import { FilmContextProvider } from './context/FilmContext'
import { FilterContextProvider } from './context/FilterContext'

createRoot(document.getElementById('root')!).render(
    <CssBaseline>
      <FilterContextProvider>
      <FilmContextProvider>
      <ModalContextProvider>
        <AppRouterProvider/>
      </ModalContextProvider>
      </FilmContextProvider>
      </FilterContextProvider>
    </CssBaseline>
)
