import axios from 'axios'

export function AxiosProvider() {
    return axios.create({
        baseURL: 'http://localhost:5010'
    })
}