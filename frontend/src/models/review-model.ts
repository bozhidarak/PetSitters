export class Review {
  id?: number;
  stars: number;
  description: string;
  reviewedUserId: number;
  authorId: number;
  authorName?: string;
  authorProfilePic?: string;

  constructor(stars: number, description: string, reviewedUserId: number, authorId: number) {
    this.stars = stars;
    this.description = description;
    this.reviewedUserId = reviewedUserId;
    this.authorId = authorId;
  }
}
