import { InstitutionModel } from '../models/InstitutionModel'
import { AxiosProvider } from '../config/axios'

class InstitutionRepository {
    public async GetInstitutions(): Promise<InstitutionModel[] | null> {
        return (await AxiosProvider().get('/instituicoes')).data
    }
}

const instance = new InstitutionRepository()
export { instance as InstitutionRepository }
