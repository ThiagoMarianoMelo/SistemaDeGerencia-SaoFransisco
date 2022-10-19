import { PencilSimple, Trash } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProjectModel } from '../../../../models/ProjectModel'
import styles from './styles.module.scss'
import { formatDateDDMMYYYY } from '../../../../utils/DateUtils'
import { ProjectRepository } from '../../../../repositories/ProjectRepository'

interface IProjectCardProps {
    project: ProjectModel;
    projects: ProjectModel[];
    setProjects: (projects: ProjectModel[]) => void;
}

export function ProjectCard({ project, projects, setProjects }: IProjectCardProps) {
    const { state } = useLocation()
    const navigate = useNavigate()

    const formattedCreatedDate = formatDateDDMMYYYY(project.dataCriacao)
    const formattedUpdatedDate = formatDateDDMMYYYY(project.dataAlteracao)

    function handleEditProject() {
        const newState = {
            idProjeto: project.id,
            nome: project.nome,
            coordenador: project.coordenador,
            idInstituicao: state.id,
            nomeInstituicao: state.name
        }

        navigate('/instituicoes/projetos/editar', {state: newState})
    }

    async function handleDeleteProject() {
        const confirmation = confirm(`Você tem certeza que deseja deletar o projeto ${project.nome}?`)
        
        if (confirmation) {
            await ProjectRepository.DeleteProject(project.id)
            const projectsFiltered = projects.filter(proj => proj.id !== project.id)
            setProjects(projectsFiltered)
        }
    }

    return (
        <tr className={styles.institution}>
            <td>{project.nome}</td>
            <td>{project.etapaAtual}</td>
            <td>{project.coordenador}</td>
            <td>{project.usuarioUltimaAlteracao}</td>
            <td>{formattedCreatedDate}</td>
            <td>{formattedUpdatedDate}</td>
            <td className={styles.actions}>
                <button type="button" title="Editar instituição" onClick={handleEditProject}>
                    <PencilSimple size={24} />
                </button>

                <button type="button" title="Deletar instituição"  onClick={handleDeleteProject}>
                    <Trash size={24} />
                </button>
            </td>
        </tr>
    )
}