import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({children, ...props}: ButtonProps) {
    return <button className={styles.button} {...props}>{children}</button>
}