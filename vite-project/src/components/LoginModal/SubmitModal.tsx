import { Button, Modal, TextField } from "@mui/material";
import styles from './LoginModal.module.scss'
import { useModalContext } from "../../context/ModalContext";
import { getPopularFilmsData } from "../../API/FilmServices";
import { useEffect, useState } from "react";
import { useFilmContext } from "../../context/FilmContext";
import mapFilmsFromServer from "../../lib/mapFilmsFromServer";

export default function SubmitModal() {
    const { modalState, setModalState } = useModalContext()

    const { dispatch } = useFilmContext();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const fetchFilms = async () => {
            const response = await getPopularFilmsData(1);
            dispatch({
                type: 'setFilms',
                payload: mapFilmsFromServer(response)
            })
        }
        fetchFilms();
    }, [token]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const token = formData.get('token') as string

        setToken(token);

        localStorage.setItem('token', token)
        setModalState(0)
    }

    const handleOnClose = () => setModalState(0)

    return(
        <>
            <Modal onClose={handleOnClose} open={ modalState === 2 ? true : false} disableAutoFocus disableEnforceFocus >
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Введите токен</h2>
                    <TextField 
                    id='standard-basic' 
                    label='токен' 
                    variant='standard' 
                    name='token'
                    InputLabelProps={{ shrink: true }} 
                    required
                    fullWidth
                    />

                    <div className={styles.wrapper}>
                        <Button onClick={handleOnClose}>ОТМЕНА</Button>
                        <Button type="submit">ОК</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}