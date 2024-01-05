export enum UserType {
    PetSitter = 1,
    PetOwner = 2,
  }

export class User {
    name:string;
    email:string;
    numberOfPets:number;
    location:string;
    description:string;
    cats:boolean;
    dogs:boolean;
    birds:boolean;
    small:boolean;
    large:boolean;
    userType:UserType;
    profilePic:string;
    pictures:string[];
    createAd: boolean;

    constructor(name:string, email:string, numberOfPets:number, location:string, description:string, cats:boolean, dogs:boolean, birds:boolean, small:boolean, large:boolean, userType:UserType, profilePic:string, pictures:string[], createAd: boolean) {
        this.name = name;
        this.email = email;
        this.numberOfPets = numberOfPets;
        this.location = location;
        this.description = description;
        this.cats = cats;
        this.dogs = dogs;
        this.birds = birds;
        this.small = small;
        this.large = large;
        this.userType = userType;
        this.profilePic = profilePic;
        this.pictures = pictures;
        this.createAd = createAd;
    }
}

export class Owner extends User {
    startDate:string;
    endDate:string;
    
    constructor(name:string,email:string, numberOfPets:number, location:string, description:string, cats:boolean, dogs:boolean, birds:boolean, small:boolean, large:boolean, startDate:string, endDate:string, userType:UserType, profilePic:string, pictures:string[], createAd: boolean) {
        super(name, email, numberOfPets, location, description, cats, dogs, birds, small, large, userType, profilePic, pictures, createAd);
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export class Sitter extends User {
    age:number;
    price:number;

    constructor(name:string,email:string, numberOfPets:number, location:string, description:string, cats:boolean, dogs:boolean, birds:boolean, small:boolean, large:boolean, age:number, price:number, userType:UserType, profilePic:string, pictures:string[], createAd: boolean) {
        super(name,email, numberOfPets, location, description, cats, dogs, birds, small, large, userType, profilePic, pictures, createAd);
        this.age = age;
        this.price = price;
    }
}