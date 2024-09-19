export const createCountryFilter = (country?: string) => {
  return country !== undefined && country !== null && country !== '' 
    ? { 'address.country': country }
    : {};
};
