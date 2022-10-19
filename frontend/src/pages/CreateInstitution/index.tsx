import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'

export interface ICreateInstitutionRequest {
    nome: string;
    email: string;
    telefone: string;
    sponsor: string;
    intercedente: string;
}

export function CreateInstitution() {
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [sponsor, setSponsor] = useState('')
    const [intercedente, setIntercedente] = useState('')

    async function handleSubmitForm(event: FormEvent) {
        event.preventDefault()
        const request: ICreateInstitutionRequest = {
            email,
            intercedente,
            nome,
            sponsor,
            telefone
        }

        await InstitutionRepository.CreateInstitution(request)

        navigate('/')
    }

    function handleChangeNome(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value)
    }

    function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handleChangeTelefone(event: ChangeEvent<HTMLInputElement>) {
        setTelefone(event.target.value)
    }

    function handleChangeSponsor(event: ChangeEvent<HTMLInputElement>) {
        setSponsor(event.target.value)
    }

    function handleChangeIntercedente(event: ChangeEvent<HTMLInputElement>) {
        setIntercedente(event.target.value)
    }
    return (
        <div className={styles.createInstitutionContainer}>
            <div className={styles.content}>
                <h1>Cadastrar Instituição</h1>
                <form onSubmit={handleSubmitForm} className={styles.form}>
                    <div className={styles.inputFields}>
                        <div className={styles.input}>
                            <label htmlFor="nome">Nome da instituição:</label>
                            <input 
                                type="text" 
                                name="nome" 
                                value={nome} 
                                placeholder="Digite o nome da instituição"
                                onChange={handleChangeNome}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="">Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={email} 
                                placeholder="email@email.com"
                                onChange={handleChangeEmail}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="telefone">Telefone:</label>
                            <input 
                                type="text" 
                                name="telefone" 
                                value={telefone} 
                                placeholder="(31) 99999-9999"
                                onChange={handleChangeTelefone}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="">Sponsor:</label>
                            <input 
                                type="text" 
                                name="sponsor" 
                                value={sponsor} 
                                placeholder="Digite o nome do sponsor"
                                onChange={handleChangeSponsor}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="intercedente">Intercedente</label>
                            <input 
                                type="text" 
                                name="intercedente" 
                                value={intercedente} 
                                placeholder="Digite o nome do intercedente"
                                onChange={handleChangeIntercedente}
                            />
                        </div>
                    </div>
                    <button type="submit">Cadastrar instituição</button>
                </form>
            </div>
        </div>
    )    

}