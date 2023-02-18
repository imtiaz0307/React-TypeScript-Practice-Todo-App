import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="/">ToDoist</a>
            </div>
            <nav>
                <ul className={styles.mainMenu}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Todos</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar