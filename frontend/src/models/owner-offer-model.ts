import { Pet } from './sitter-offer-model'

export interface PetOwnerOffer {
  id: number;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  picturePaths: string[];
  pets: Pet[];

  userName?: string;
  userEmail?: string;
  userLocation?: string;
  userProfilePic?: string;
}
