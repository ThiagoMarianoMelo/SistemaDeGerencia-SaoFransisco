import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { ProjectRepository } from '../../repositories/ProjectRepository'

export interface IEditProjectRequest {
    idProjeto: number;
    idUsuario: number;
    nome: string;
    coordenador: string;
}

export function EditProject() {
    const { user } = useContext(UserContext)
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [])

    const [nome, setNome] = useState(state.nome)
    const [coordenador, setCoordenador] = useState(state.coordenador)

    async function handleSubmitForm(event: FormEvent) {
        event.preventDefault()

        if (user) {
            const request: IEditProjectRequest = {
                idProjeto: state.idProjeto,
                idUsuario: user.id,
                nome,
                coordenador 
            }

            const newState = {
                id: state.idInstituicao,
                name: state.nomeInstituicao
            }

            await ProjectRepository.UpdateProject(request)
            navigate('/instituicoes/projetos', {state: newState})
        }
    }

    function handleChangeNome(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value)
    }

    function handleChangeCoordenador(event: ChangeEvent<HTMLInputElement>) {
        setCoordenador(event.target.value)
    }

    return (
        <div className={styles.editInstitutionContainer}>
            <div className={styles.content}>
                <h1>Editar Projeto</h1>
                <form onSubmit={handleSubmitForm} className={styles.form}>
                    <div className={styles.inputFields}>
                        <div className={styles.input}>
                            <label htmlFor="nome">Nome do Projeto:</label>
                            <input 
                                type="text" 
                                name="nome" 
                                value={nome} 
                                placeholder="Digite o nome da instituição"
                                onChange={handleChangeNome}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="">Coordenador:</label>
                            <input 
                                type="text" 
                                name="text" 
                                value={coordenador} 
                                placeholder="Digite o nome do coordenador do projeto"
                                onChange={handleChangeCoordenador}
                            />
                        </div>
                    </div>
                    <button type="submit">Atualizar projeto</button>
                </form>
            </div>
        </div>
    )    

}