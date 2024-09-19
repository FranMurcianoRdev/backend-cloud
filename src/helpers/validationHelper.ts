export const isValidReview = (review: { name: string; comment: string }): boolean => {
  const isNotEmpty = (str: string) => str.trim().length > 0;
  
  return isNotEmpty(review.name) && isNotEmpty(review.comment);
};


