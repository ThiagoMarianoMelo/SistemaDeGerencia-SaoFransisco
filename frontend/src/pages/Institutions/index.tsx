import { useNavigate } from 'react-router-dom'

import { InstitutionModel } from '../../models/InstitutionModel'
import { ChangeEvent, useEffect, useState } from 'react'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'
import { InstitutionCard } from './components/InstitutionCard'

import styles from './styles.module.scss'
import { Loading } from '../../components/Loading'

export function Institutions() {
    const navigate = useNavigate()

    const [institutions, setInstitutions] = useState<InstitutionModel[]>([])
    const [filter, setFilter] = useState('')    

    const [isLoading, setIsLoading] = useState(false)

    const filteredList = institutions
        .filter(institution => institution.nome.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        getAllInstitutions()
    }, [])
    
    async function getAllInstitutions() {
        setIsLoading(true)
        const institutionsFound = await InstitutionRepository.GetInstitutions()
        setIsLoading(false)
        
        if (institutionsFound) {
            setInstitutions(institutionsFound)
        }
    }

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value)
    }

    function handleNavigateCreateInstitution() {
        navigate('/instituicoes/cadastrar')
    }

    return isLoading ? (
        <Loading />
    ) : (
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
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Patrocinador</th>
                        <th>Intercedente</th>
                        <th>Data entrada</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map(institution => {
                        return <InstitutionCard key={institution.id} institution={institution} institutions={institutions} setInstitutions={setInstitutions}/>
                    })}
                </tbody>
            </table>
            <button type="button" onClick={handleNavigateCreateInstitution}>Cadastrar Instituição</button>
        </div>
    )
}