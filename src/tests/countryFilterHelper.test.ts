import { createCountryFilter } from '../helpers/countryFilterHelper';

describe('Country Filter Helper', () => {
  test('should handle an empty string as no country', () => {
    const country = '';
    const expectedFilter = { }; 
    expect(createCountryFilter(country)).toEqual(expectedFilter);
  });

  test('should return an empty filter if no country is provided', () => {
    const expectedFilter = {}; // Espera el filtro vacío cuando no se proporciona país
    expect(createCountryFilter()).toEqual(expectedFilter);
  });

  test('should return a filter for a specific country', () => {
    const country = 'Brazil';
    const expectedFilter = { 'address.country': 'Brazil' };
    expect(createCountryFilter(country)).toEqual(expectedFilter);
  });
});

