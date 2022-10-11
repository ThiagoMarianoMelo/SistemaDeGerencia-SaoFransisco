import { Institutions } from './pages/Institutions'
import { UserContext } from './context/UserContext'
import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/LoggedUserLayout'
import { VisitorLayout } from './layouts/VisitorLayout'

export function Router() {
    const { user } = useContext(UserContext)
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
            </Route>
        </Routes>
    )
}