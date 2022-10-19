import { format, parseISO } from 'date-fns'
import { PencilSimple, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { InstitutionRepository } from '../../../../repositories/InstitutionRepository'
import { InstitutionModel } from '../../../../models/InstitutionModel'
import styles from './styles.module.scss'

interface IInstutionCardProps {
    institution: InstitutionModel;
    institutions: InstitutionModel[];
    setInstitutions: (institutions: InstitutionModel[]) => void;
}

export function InstitutionCard({ institution, institutions, setInstitutions }: IInstutionCardProps) {
    const navigate = useNavigate()

    const dateISO = parseISO(institution.dataEntrada)
    const formattedDateDDMMYYYY = format(dateISO, 'dd/MM/yyyy')

    function handleEditInstitution() {
        navigate('/instituicoes/editar', {state: institution})
    }

    function handleRedirectToProjectsFromInstitution() {
        const newState = {
            id: institution.id,
            name: institution.nome
        }

        navigate('/instituicoes/projetos', {state: newState})
    }

    async function handleDeleteInstitution() {
        const confirmation = confirm(`Você tem certeza que deseja deletar a instituição ${institution.nome}?`)
        
        if (confirmation) {
            await InstitutionRepository.DeleteInstitution(institution.id)
            const institutionsFiltered = institutions.filter(inst => inst.id !== institution.id)
            setInstitutions(institutionsFiltered)
        }
    }

    return (
        <tr className={styles.institution}>
            <td className={styles.name} onClick={handleRedirectToProjectsFromInstitution}>
                {institution.nome}
            </td>
            <td>{institution.email}</td>
            <td>{institution.telefone}</td>
            <td>{institution.intercedente}</td>
            <td>{institution.sponsor}</td>
            <td>{formattedDateDDMMYYYY}</td>
            <td className={styles.actions}>
                <button type="button" title="Editar instituição" onClick={handleEditInstitution}>
                    <PencilSimple size={24} />
                </button>

                <button type="button" title="Deletar instituição"  onClick={handleDeleteInstitution}>
                    <Trash size={24} />
                </button>
            </td>
        </tr>
    )
}