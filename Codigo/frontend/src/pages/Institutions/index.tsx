import { InstitutionModel } from 'models/InstitutionModel'
import { ChangeEvent, useEffect, useState } from 'react'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'
import { InstitutionCard } from './components/InstitutionCard'

import styles from './styles.module.scss'

export function Institutions() {
    const [institutions, setInstitutions] = useState<InstitutionModel[]>([])
    const [filter, setFilter] = useState('')    

    const filteredList = institutions
        .filter(institution => institution.nome.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        getAllInstitutions()
    }, [])
    
    async function getAllInstitutions() {
        const institutionsFound = await InstitutionRepository.GetInstitutions()
        if (institutionsFound) {
            setInstitutions(institutionsFound)
        }
    }

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value)
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.filterContainer}>
                <label htmlFor="filter">Filtro:</label>
                <input 
                    type="text"
                    name="filter"
                    onChange={handleFilter} 
                    placeholder="Digite o nome da instituição"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Instituição</th>
                        <th>Fluxo</th>
                        <th>Etapa</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Patrocinador</th>
                        <th>Intercedente</th>
                        <th>Data entrada</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map(institution => {
                        return <InstitutionCard key={institution.id} institution={institution} />
                    })}
                </tbody>
            </table>
        </div>
    )
}