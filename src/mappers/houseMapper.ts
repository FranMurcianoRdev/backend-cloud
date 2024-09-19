import { House } from "../models/houseModel";
import { Review } from "../models/reviewModel";

interface HouseDetail {
  name: string;
  picture_url: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: ReviewDetail[];
}

interface ReviewDetail {
  name: string;
  comment: string;
  date: string; 
}

export const houseToHouseApiDetail = (house: House): HouseDetail => {
  return {
    name: house.name,
    picture_url: house.images.picture_url,
    description: house.description,
    address: `${house.address.street}, ${house.address.suburb}, ${house.address.country}`,
    bedrooms: house.bedrooms,
    beds: house.beds,
    bathrooms: house.bathrooms,
    reviews: house.reviews.slice(0, 5).map((review: Review) => ({
      name: review.reviewer_name,  
      comment: review.comments,    
      date: typeof review.date === 'object' && '$date' in review.date
        ? review.date.$date
        : new Date(review.date).toISOString(), 
    })),
  };
};
