import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { SignOut } from 'phosphor-react'

export function Header() {
    const {user, logoutUser} = useContext(UserContext)

    return (
        <header className={styles.header}>
            <Link to="/">Gerência de Projetos</Link>
            <nav>
            {user?.admin && (
                <>
                <Link to="/">Instituições</Link>
                <Link to="/">Gerenciar usuários</Link>
                </>
            )}
            <button type="button" title="Sair da sessão" onClick={logoutUser}>
                <SignOut 
                    size={32} 
                    color="#FFF"
                    />
            </button>
            </nav>
        </header>
    )
}