import { ProjectModel } from '../../models/ProjectModel'
import { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { ProjectCard } from './components/ProjectCard'
import { ProjectRepository } from '../../repositories/ProjectRepository'

export function Projects() {
    const navigate = useNavigate()
    const { state } = useLocation()

    const [projects, setProjects] = useState<ProjectModel[]>([])
    const [filter, setFilter] = useState('')    

    const filteredList = projects
        .filter(project => project.nome.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        if (!state.id) {
            navigate('/')
        }
        else {
            getAllProjectsFromInstitution()
        }
    }, [])

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value)
    }

    function handleNavigateCreateProject() {
        navigate('/instituicoes/projetos/cadastrar', {state})
    }
    
    async function getAllProjectsFromInstitution() {
        const projectsFound = await ProjectRepository.GetProjectsFromInstitution(state.id)
        if (projectsFound) {
            setProjects(projectsFound)
        }
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerTable}>
                <h2>Projetos da Instituição: <em>{state.name}</em></h2>
                <div className={styles.filterContainer}>
                    <label htmlFor="filter">Filtro:</label>
                    <input 
                        type="text"
                        name="filter"
                        onChange={handleFilter} 
                        placeholder="Digite o nome da instituição"
                    />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Etapa Atual</th>
                        <th>Coordenador</th>
                        <th>Última atualização feita por</th>
                        <th>Data de Criação</th>
                        <th>Data da Última Atualização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map(project => {
                        return <ProjectCard key={project.id} project={project} projects={projects} setProjects={setProjects}/>
                    })}
                </tbody>
            </table>
            <button type="button" onClick={handleNavigateCreateProject}>Cadastrar Projeto</button>
        </div>
    )
}