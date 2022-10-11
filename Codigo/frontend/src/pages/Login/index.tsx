import { Button } from '../../components/Button'
import { ChangeEvent, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { UserRepository } from '../../repositories/UserRepository'
import { UserContext } from '../../context/UserContext'

export interface ILoginRequest {
    email: string;
    senha: string;
}

export function Login() {
    const { saveUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleFormSubmit() {
        event?.preventDefault()

        const request: ILoginRequest = {
            email,
            senha: password
        } 
        
        setEmail('')
        setPassword('')
        
        const userFound = await UserRepository.Login(request)
        
        if (userFound) {
            saveUser(userFound)
        }
        else {
            alert('Usuário não foi encontrado!')
        }

    }

    function handleResetPassword() {
        event?.preventDefault()
    }

    function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    return (
        <div>
            <main className={styles.loginContainer}>
                <h1>Gerência de Projetos - Hospital São Francisco</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.input}>
                        <div className={styles.inputField}>
                            <label htmlFor="email">Email:</label>
                            <input value={email} type="email" name="email" required onChange={handleChangeEmail}/>
                        </div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputField}>
                            <label htmlFor="senha">Senha:</label>
                            <input value={password} type="password" name="senha" required onChange={handleChangePassword}/>
                        </div>
                        <button type="button" onClick={handleResetPassword}>Esqueci minha senha</button>
                    </div>
                    <Button type="submit">Logar</Button>
                </form>
            </main>
        </div>
    )
}