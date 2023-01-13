export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    userName: string

    constructor (id: number, email: string, firstName: string, lastName: string, userName: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
    }
}