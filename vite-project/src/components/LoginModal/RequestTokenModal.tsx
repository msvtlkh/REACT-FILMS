import { Button, Modal, TextField } from "@mui/material";
import styles from './LoginModal.module.scss'
import { useModalContext } from "../../context/ModalContext";

export default function RequestTokenModal() {
    const { modalState, setModalState } = useModalContext()

    const handleRequest = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setModalState(2)
    }

    const handleOnClose = () => setModalState(0)

    return(
        <>
            <Modal onClose={handleOnClose} open={modalState === 1 ? true : false } disableAutoFocus disableEnforceFocus >
                <form className={styles.form} onSubmit={handleRequest}>
                    <h2 className={styles.title}>Запросить токен</h2>
                    <TextField 
                    id='standard-basic' 
                    label='почта' 
                    variant='standard' 
                    name='token'
                    InputLabelProps={{ shrink: true }}
                    required 
                    fullWidth
                    />

                    <div className={styles.wrapper}>
                        <Button onClick={handleOnClose}>ОТМЕНА</Button>
                        <Button type="submit">ЗАПРОСИТЬ</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}