import { format, parseISO } from 'date-fns'
import { InstitutionModel } from '../../../../models/InstitutionModel'
import styles from './styles.module.scss'

interface IInstutionCardProps {
    institution: InstitutionModel;
}

export function InstitutionCard({ institution }: IInstutionCardProps) {
    const dateISO = parseISO(institution.dataEntrada)
    const formattedDateDDMMYYYY = format(dateISO, 'dd/MM/yyyy')

    return (
        <tr className={styles.institution}>
            <td>{institution.nome}</td>
            <td>Fluxo</td>
            <td>Etapa</td>
            <td>{institution.email}</td>
            <td>{institution.telefone}</td>
            <td>{institution.intercedente}</td>
            <td>{institution.sponsor}</td>
            <td>{formattedDateDDMMYYYY}</td>
        </tr>
    )
}