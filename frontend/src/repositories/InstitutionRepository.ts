import { InstitutionModel } from '../models/InstitutionModel'
import { AxiosProvider } from '../config/axios'
import { ICreateInstitutionRequest } from 'pages/CreateInstitution'

class InstitutionRepository {

    public async GetInstitutions(): Promise<InstitutionModel[] | null> {
        return (await AxiosProvider().get('/instituicoes')).data
    }

    public async CreateInstitution(institution: ICreateInstitutionRequest): Promise<void | null> {
        (await AxiosProvider().post('/instituicoes', {...institution}))
    }

    public async UpdateInstitution(institution: InstitutionModel): Promise<void | null> {
        (await AxiosProvider().put('/instituicoes', {...institution}))
    }

    public async DeleteInstitution(id: number): Promise<void> {
        await AxiosProvider().delete(`/instituicoes?id=${id}`)
    }
}

const instance = new InstitutionRepository()
export { instance as InstitutionRepository }
