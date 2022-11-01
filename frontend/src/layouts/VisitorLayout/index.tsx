import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

export function VisitorLayout() {
    return (
        <div className={styles.container}>
            <Outlet/>
        </div>
    )
}