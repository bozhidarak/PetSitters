import { Pet } from './sitter-offer-model'

export class PetOwnerOffer {
  id?: number;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  picturePaths: string[];
  pets: Pet[];

  userName?: string;
  userEmail?: string;
  userProfilePic?: string;

  constructor(description: string, location: string, startDate: Date, endDate: Date, userId: number, pets: Pet[]) {
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.pets = pets;
    this.picturePaths = [];
  }
}
