import { UserModel } from '../models/UserModel'
import React, { ReactNode, useState } from 'react'

export interface IUserContext {
    saveUser: (user: UserModel) => void;
    verifyIfUserIsLoggedIn: () => void;
    user: UserModel | null;
    logoutUser: () => void;
}

interface IUserProvider {
    children: ReactNode;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({children}: IUserProvider) => {
    const [user, setUser] = useState<UserModel | null>(null)

    function verifyIfUserIsLoggedIn() {
        const userFound = localStorage.getItem('@gerencia-de-projetos:user')

        if (userFound) {
            setUser(JSON.parse(userFound))
        }
    }

    function logoutUser() {
        localStorage.removeItem('@gerencia-de-projetos:user')
        setUser(null)
    }

    function saveUser(user: UserModel) {
        const userJSON = JSON.stringify(user)
        setUser(user)
        localStorage.setItem('@gerencia-de-projetos:user', userJSON)
    }

    const store: IUserContext = {
        saveUser,
        verifyIfUserIsLoggedIn,
        user,
        logoutUser
    }

    return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}
