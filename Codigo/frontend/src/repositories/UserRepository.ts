import { AxiosProvider } from '../config/axios'
import { UserModel } from '../models/UserModel'
import { ILoginRequest } from '../pages/Login'

class UserRepository {
    public async Login(request: ILoginRequest): Promise<UserModel | null> {
        return (await AxiosProvider().post('/Login', request)).data
    }
}

const instance = new UserRepository()
export {instance as UserRepository}
