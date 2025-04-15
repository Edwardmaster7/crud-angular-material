import { v4 as uuid } from 'uuid'

export class Client {
    id?: string
    name?: string
    email?: string
    // phone: string
    cpf?: string
    birthDate?: string
    // address: string
    city?: string
    state?: string
    // zip: string

    static newClient() {
        let client = new Client()
        client.id = uuid()
        return client
    }
}