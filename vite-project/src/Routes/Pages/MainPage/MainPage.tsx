
import Filter from '../../../components/FilmFilter/Filter'
import FilmsList from '../../../components/FilmList/FIlmList'
import RequestTokenModal from '../../../components/LoginModal/RequestTokenModal'
import SubmitModal from '../../../components/LoginModal/SubmitModal'
import styles from './MainPage.module.scss'

function MainPage() {
  return (
    <div className={styles.container}>
      <RequestTokenModal/>
      <SubmitModal/>

      <div className={styles.wrapper}>
        <Filter/>
        <FilmsList/>
      </div>
      
    </div>
  )
}

export default MainPage
