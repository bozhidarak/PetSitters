export class User {
    id?: number;
    password: string;
    email:string;
    location:string;
    name:string;


    constructor( password: string, email:string, location:string, name:string) {
        this.password = password;
        this.email = email;
        this.location = location;
        this.name = name;
    }
}