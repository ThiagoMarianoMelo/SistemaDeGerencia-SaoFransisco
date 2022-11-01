import { CircleNotch } from 'phosphor-react'
import { useEffect } from 'react'
import styles from './styles.module.scss'

export function Loading() {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {document.body.style.overflow = 'visible'}
    }, [])

    return (
        <div className={styles.overlay}>
            <div className={styles.iconContainer}>
                <CircleNotch className={styles.icon} size={64} color="#76C04F" />
            </div>
        </div>
    )
}