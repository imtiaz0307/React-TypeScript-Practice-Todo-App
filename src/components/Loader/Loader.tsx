import styles from './Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.bg}></div>
        </div>
    )
}

export default Loader