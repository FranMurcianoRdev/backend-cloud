export const paginate = (array: any[], skip: number, limit: number) => {
  return array.slice(skip, skip + limit);
};