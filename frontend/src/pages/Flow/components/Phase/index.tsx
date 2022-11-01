import { PhaseModel } from '../../../../models/PhaseModel'
import { useNavigate } from 'react-router-dom'
import { PhaseRepository } from '../../../../repositories/PhaseRepository'
import styles from './styles.module.scss'
import { useState } from 'react'
import { Loading } from '../../../../components/Loading'

interface IPhaseProps {
    phaseDetails: PhaseModel
    projectName: string;
    previousPhaseIsNotCompleted: boolean;
}

export interface IPhaseCompleteRequest {
    idEtapa: number;
    idProjeto: number;
}

export function Phase({ phaseDetails, projectName, previousPhaseIsNotCompleted }: IPhaseProps) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    async function handleCompletePhase() {
        const request: IPhaseCompleteRequest = {
            idEtapa: phaseDetails.idEtapa,
            idProjeto: phaseDetails.idProjeto
        }
        
        setIsLoading(true)
        await PhaseRepository.CompletePhaseOfProject(request)
        setIsLoading(false)
        
        window.location.reload()
    }

    function handleGetDetailsFromPhase() {
        const newState = {
            phase: phaseDetails,
            projectName
        }

        navigate('/instituicoes/projetos/fluxo/fase', {state: newState})
    }

    return (
        <div className={`${styles.phaseContainer}  ${previousPhaseIsNotCompleted ? styles.notCompleted : styles.toComplete}`}>
            <h4>{phaseDetails.nomeEtapa}</h4>
            
            <div className={styles.completedArea}>
                {previousPhaseIsNotCompleted && <h4>Finalize a fase anterior para alterar essa fase.</h4>}

                {phaseDetails.concluida ? (
                    <strong className={styles.textCompleted}>Fase finalizada</strong>
                ) : (
                    <button 
                        type="button" 
                        onClick={handleCompletePhase}
                        className={`${styles.buttonCompletePhase} ${styles.button}`}
                        disabled={previousPhaseIsNotCompleted}
                    >
                        Finalizar etapa
                    </button>
                )}
            </div>

            <button 
                type="button" 
                onClick={handleGetDetailsFromPhase}
                className={`${styles.buttonGetDetails} ${styles.button}`}
                disabled={previousPhaseIsNotCompleted}
            >
                Ver detalhes da fase
            </button>

            {isLoading && <Loading />}
        </div>
    )
}