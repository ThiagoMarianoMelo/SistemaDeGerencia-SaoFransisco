import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProjectRepository } from '../../repositories/ProjectRepository'
import { UserContext } from '../../context/UserContext'
import { FlowModel } from '../../models/FlowModel'
import { FlowRepository } from '../../repositories/FlowRepository'
import { Loading } from '../../components/Loading'

export interface ICreateProjectRequest {
    idInstituicao: number;
    idUsuario: number;
    nome: string;
    coordenador: string;
    idFluxo: number;
}

export function CreateProject() {
    const DEFAULT_SELECTED_FLOW_ID = 'DEFAULT'
    
    const { user } = useContext(UserContext)
    const { state } = useLocation()
    const navigate = useNavigate()

    const [fluxos, setFluxos] = useState<FlowModel[]>([])
    
    const [nome, setNome] = useState('')
    const [coordenador, setCoordenador] = useState('')
    const [selectedFlowId, setSelectedFlowId] = useState<string>(DEFAULT_SELECTED_FLOW_ID)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getFlows()
    }, [])

    async function getFlows() {
        setIsLoading(true)
        const flows = await FlowRepository.GetFlows()
        setIsLoading(false)
        
        if (flows) {
            setFluxos(flows)
        }
    }

    async function handleSubmitForm(event: FormEvent) {
        event.preventDefault()

        if (user && selectedFlowId !== DEFAULT_SELECTED_FLOW_ID) {
            const request: ICreateProjectRequest = {
                nome,
                coordenador,
                idInstituicao: state.id,
                idUsuario: user.id,
                idFluxo: Number(selectedFlowId)
            }

            setIsLoading(true)
            await ProjectRepository.CreateProject(request)
            setIsLoading(false)
            
            navigate('/instituicoes/projetos', {state})
        }
    }

    function handleChangeNome(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value)
    }

    function handleChangeCoordenador(event: ChangeEvent<HTMLInputElement>) {
        setCoordenador(event.target.value)
    }

    function handleChangeFluxo(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedFlowId(event.target.value)
    }

    return (
        <div className={styles.createInstitutionContainer}>
            <div className={styles.content}>
                <h1>Cadastrar Projeto</h1>
                <form onSubmit={handleSubmitForm} className={styles.form}>
                    <div className={styles.inputFields}>
                        <div className={styles.input}>
                            <label htmlFor="nome">Nome do Projeto:</label>
                            <input 
                                type="text" 
                                name="nome" 
                                value={nome} 
                                placeholder="Digite o nome do projeto"
                                onChange={handleChangeNome}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="">Coordenador:</label>
                            <input 
                                type="text" 
                                name="text" 
                                value={coordenador} 
                                placeholder="Nome do coordenador do projeto"
                                onChange={handleChangeCoordenador}
                            />
                        </div>
                        
                        <div className={styles.input}>
                                <label htmlFor="fluxo">Fluxo:</label>
                                <select name="fluxo" defaultValue='DEFAULT_SELECTED_FLOW_ID' onChange={handleChangeFluxo}>
                                    <option value="DEFAULT_SELECTED_FLOW_ID" disabled hidden>Selecione o fluxo:</option>
                                    {fluxos.map(fluxo => {
                                        return <option key={fluxo.idFluxo} value={fluxo.idFluxo}>{fluxo.nome}</option>
                                    })}
                                </select>
                        </div>
                    </div>
                    <button type="submit">Cadastrar Projeto</button>
                </form>
            </div>
            {isLoading && <Loading />}
        </div>
    )    
}