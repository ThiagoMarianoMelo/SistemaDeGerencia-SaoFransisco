import { UserModel } from '../models/UserModel'
import React, { useState } from 'react'

export interface IUserContext {
    saveUser: (user: UserModel) => void;
    user: UserModel | null;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

export const UserProvider: React.FC<any> = ({children}) => {
    const [user, setUser] = useState<UserModel | null>(null)

    function saveUser(user: UserModel) {
        setUser(user)
    }

    const store: IUserContext = {
        saveUser,
        user
    }

    return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}
