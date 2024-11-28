import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material'
import styles from './Header.module.scss'
import { useModalContext } from '../../context/ModalContext';

export default function Header() {
    const { setModalState } = useModalContext()

    const handleOpen = () => setModalState(1)

    return(
        <div className={styles.header}>
            <h1 className={styles.title}>Фильмы</h1>
            
            <IconButton onClick={handleOpen}>
                <AccountCircleIcon fontSize='large' sx={{ color: 'white' }}/>
            </IconButton>
        </div>
    )
}