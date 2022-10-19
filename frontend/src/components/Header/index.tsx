import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <Link to="/">Gerência de Projetos</Link>
            <nav>
                <Link to="/">Instituições</Link>
                <Link to="/fluxos">Fluxos</Link>
                <Link to="/relatorios">Relatórios</Link>
            </nav>
        </header>
    )
}