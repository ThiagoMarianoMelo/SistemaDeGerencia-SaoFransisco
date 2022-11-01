import styles from './styles.module.scss'
import { InstitutionModel } from '../../models/InstitutionModel'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'
import { Loading } from '../../components/Loading'

export function EditInstitution() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [])

    const institutionState: InstitutionModel = state

    const [nome, setNome] = useState(institutionState.nome)
    const [email, setEmail] = useState(institutionState.email)
    const [telefone, setTelefone] = useState(institutionState.telefone)
    const [sponsor, setSponsor] = useState(institutionState.sponsor)
    const [intercedente, setIntercedente] = useState(institutionState.intercedente)

    async function handleSubmitForm(event: FormEvent) {
        event.preventDefault()
        const request: InstitutionModel = {
            ...state,
            nome,
            email,
            telefone,
            sponsor,
            intercedente
        }
        
        setIsLoading(true)
        await InstitutionRepository.UpdateInstitution(request)
        setIsLoading(false)
        
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
        <div className={styles.editInstitutionContainer}>
            <div className={styles.content}>
                <h1>Editar Instituição</h1>
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
                    <button type="submit">Atualizar instituição</button>
                </form>
            </div>
            {isLoading && <Loading/>}
        </div>
    )    
}