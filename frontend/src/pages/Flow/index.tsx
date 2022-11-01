import { PhaseModel } from '../../models/PhaseModel'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Phase } from './components/Phase'
import styles from './styles.module.scss'
import { PhaseRepository } from '../../repositories/PhaseRepository'
import { Loading } from '../../components/Loading'

export function Flow() {
    const { state } = useLocation()
    const navigate = useNavigate()
    
    const [phases, setPhases] = useState<PhaseModel[]>([])

    const [isLoading, setIsLoading] = useState(false)

    if (!state) {
        navigate('/')
    }

    useEffect(() => {
        getAllPhases()
    }, [])

    async function getAllPhases() {
        setIsLoading(true)
        const phasesResult = await PhaseRepository.GetAllPhasesOfProject(state.id)
        setIsLoading(false)
        
        if (phasesResult) {
            setPhases(phasesResult)
        }
    }

    return isLoading ? (
        <Loading />
    ) : (
        <div className={styles.flowContainer}>
            <h1>Fluxo do projeto: <em className={styles.name}>{state.name}</em></h1>
            <div className={styles.phases}>
                {phases.map((phase, i) => {
                    const indexPhaseNotConcluded = phases.findIndex(phase => !phase.concluida)
                    const isActualIndexGreaterThanPhaseNotConcluded = i > indexPhaseNotConcluded
                    
                    return (
                        <Phase 
                            key={phase.idEtapa}
                            phaseDetails={phase}
                            previousPhaseIsNotCompleted={isActualIndexGreaterThanPhaseNotConcluded}
                            projectName={state.name}
                        />
                    )
                })}
            </div>
        </div>
    )
}