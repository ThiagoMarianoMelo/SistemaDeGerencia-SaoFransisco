import { FlowModel } from '../models/FlowModel'
import { AxiosProvider } from '../config/axios'

class FlowRepository {
    public async GetFlows(): Promise<FlowModel[] | null> {
        return (await AxiosProvider().get('/instituicoes/projetos/fluxos')).data
    }
}

const instance = new FlowRepository()
export { instance as FlowRepository}