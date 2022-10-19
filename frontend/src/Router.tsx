import { Institutions } from './pages/Institutions'
import { UserContext } from './context/UserContext'
import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/LoggedUserLayout'
import { VisitorLayout } from './layouts/VisitorLayout'
import { EditInstitution } from './pages/EditInstitution'
import { CreateInstitution } from './pages/CreateInstitution'
import { Projects } from './pages/Projects'
import { CreateProject } from './pages/CreateProject'
import { EditProject } from './pages/EditProject'


export function Router() {
    const { user, verifyIfUserIsLoggedIn } = useContext(UserContext)

    useEffect(() => {
        verifyIfUserIsLoggedIn()
    }, [])

    return !user ? (
        <Routes>
            <Route path="/" element={<VisitorLayout/>}>
                <Route path="/" element={<Login />}/>
            </Route>
        </Routes>
    ) : (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Institutions />}/>
                <Route path="/instituicoes/cadastrar" element={<CreateInstitution />}/>
                <Route path="/instituicoes/editar" element={<EditInstitution />}/>
                <Route path="/instituicoes/projetos" element={<Projects />}/>
                <Route path="/instituicoes/projetos/cadastrar" element={<CreateProject />}/>
                <Route path="/instituicoes/projetos/editar" element={<EditProject />}/>
            </Route>
        </Routes>
    )
}