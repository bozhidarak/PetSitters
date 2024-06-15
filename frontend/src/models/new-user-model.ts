export class User {
    id: number;
    username: string;
    password: string;
    email:string;
    location:string;
    birthdate:Date;
    gender:boolean;
    profilePic:string;
    name:string;


    constructor(id:number, username: string, password: string, email:string, location:string, birthdate:Date, gender:boolean, profilePic:string, name:string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.location = location;
        this.birthdate = birthdate;
        this.gender = gender;
        this.profilePic = profilePic;
        this.name = name;
    }
}