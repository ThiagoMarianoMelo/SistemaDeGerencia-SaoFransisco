import { ProjectModel } from '../models/ProjectModel'
import { AxiosProvider } from '../config/axios'
import { ICreateProjectRequest } from '../pages/CreateProject'
import { EditProjectRequest as IEditProjectRequest } from 'pages/EditProject'

class ProjectRepository {
    public async GetProjectsFromInstitution(institutionId: number): Promise<ProjectModel[] | null> {
        return (await AxiosProvider().get(`/instituicoes/projetos?id=${institutionId}`)).data
    }

    public async CreateProject(project: ICreateProjectRequest): Promise<void | null> {
        return (await AxiosProvider().post('/instituicoes/projetos', {...project}))
    }

    public async UpdateProject(project: IEditProjectRequest): Promise<void | null> {
        return (await AxiosProvider().put('/instituicoes/projetos', {...project}))
    }

    public async DeleteProject(id: number): Promise<void> {
        await AxiosProvider().delete(`/instituicoes/projetos?id=${id}`)
    }
}

const instance = new ProjectRepository()
export { instance as ProjectRepository}