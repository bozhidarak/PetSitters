export class SitterOffer{
    offerId?: number;
    description: string;
    pricePerDay: number;
    availableFrom:string;
    availableUntil:string;
    userId: number;
    picturePaths: string[] =[];
    pets: Pet[];

    userName?: string;
    userEmail?: string;
    userLocation?: string;
    userProfilePic?: string;

    constructor(description: string, pricePerDay: number, availableFrom: string, availableUntil: string, userId: number, pets: Pet[]){
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
        this.userId = userId;
        this.pets = pets;
    }
}

export interface Pet {
    petType: string;
    numberOfPets: number;
  }