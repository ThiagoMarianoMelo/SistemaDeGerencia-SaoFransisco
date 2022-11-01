import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PhaseRepository } from '../../repositories/PhaseRepository'
import styles from './styles.module.scss'

export function PhaseDetails() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [comments, setComments] = useState<string[]>([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (state) {
            getCommentsFromPhase()
        }
        else {
            navigate('/')
        }
    }, [])

    async function getCommentsFromPhase() {
        setIsLoading(true)
        const response = await PhaseRepository.GetCommentsFromPhase(state.phase.idEtapa)
        setIsLoading(false)

        if (response) {
            setComments(response)
        }
    }

    async function handleCompletePhase() {
        const idCompletedPhase = await PhaseRepository.CompletePhaseOfProject(state.phase.idEtapa)
        if (idCompletedPhase) {
            navigate('/instituicoes/projetos/fluxo', {state: state.projectName})
        }
    }

    return (
        <div className={styles.phaseDetailsContainer}>
            <div className={styles.header}>
                <h2>Fase: <em className={styles.name}>{state.phase.nomeEtapa}</em></h2>
                <h2>Projeto: <em className={styles.name}>{state.projectName}</em></h2>
            </div>

            <section className={styles.commentArea}>
                <ul className={styles.content}>
                    {comments.map(comment => {
                        return <Comment key={comment.id}/>
                    })}
                </ul>
            </section>
        </div>
    )
}