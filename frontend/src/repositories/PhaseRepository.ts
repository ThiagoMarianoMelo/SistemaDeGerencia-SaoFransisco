import { PhaseModel } from '../models/PhaseModel'
import { AxiosProvider } from '../config/axios'
import { IPhaseCompleteRequest } from '../pages/Flow/components/Phase'

class PhaseRepository {
    public async GetCommentsFromPhase(phaseId: number): Promise<string[] | null> {
        return (await AxiosProvider().get(`/instituicoes/projetos/fluxos/etapas/detalhes?id=${phaseId}`)).data
    }

    public async GetAllPhasesOfProject(projectId: number): Promise<PhaseModel[] | null> {
        return (await AxiosProvider().get(`/instituicoes/projetos/fluxos/etapas?id=${projectId}`)).data
    }

    public async CompletePhaseOfProject(request: IPhaseCompleteRequest): Promise<number | null> {
        return (await AxiosProvider().patch('/instituicoes/projetos/fluxos/etapas', {...request})).data
    }
}

const instance = new PhaseRepository()
export { instance as PhaseRepository}