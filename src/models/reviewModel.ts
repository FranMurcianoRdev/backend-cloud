export interface Review {
  _id: string;
  date: {
    $date: string; 
  };
  listing_id: string;
  reviewer_id: string;
  reviewer_name: string; 
  comments: string;      
}
