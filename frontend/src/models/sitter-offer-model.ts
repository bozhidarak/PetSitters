export class SitterOffer{
    offerId: number;
    description: string;
    pricePerDay: number;
    availableFrom:Date;
    availableUntil:Date;
    userId: number;
    picturePaths: string[];
    pets: Pet[];

    userName?: string;
    userEmail?: string;
    userLocation?: string;
    userProfilePic?: string;

    constructor(offerId: number, description: string, pricePerDay: number, availableFrom: Date, availableUntil: Date, userId: number, picturePaths: string[], pets: Pet[], userName: string, userEmail: string, userLocation: string, userProfilePic: string){
        this.offerId = offerId;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
        this.userId = userId;
        this.picturePaths = picturePaths;
        this.pets = pets;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userLocation = userLocation;
        this.userProfilePic = userProfilePic;
    }
}

export interface Pet {
    petType: string;
    numberOfPets: number;
  }