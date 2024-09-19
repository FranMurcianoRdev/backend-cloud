import { isValidReview } from '../helpers/validationHelper';

describe('Validation Helpers', () => {
  test('should return true for a valid review', () => {
    const review = { name: 'Alice', comment: 'Great place!' };
    expect(isValidReview(review)).toBe(true);
  });

  test('should return false if name is missing', () => {
    const review = { name: '', comment: 'Great place!' };
    expect(isValidReview(review)).toBe(false);
  });

  test('should return false if comment is missing', () => {
    const review = { name: 'Alice', comment: '' };
    expect(isValidReview(review)).toBe(false);
  });

  test('should return false if name is an empty string', () => {
    const review = { name: '', comment: 'Great place!' };
    expect(isValidReview(review)).toBe(false);
  });

  test('should return false if comment is an empty string', () => {
    const review = { name: 'Alice', comment: '' };
    expect(isValidReview(review)).toBe(false);
  });

  test('should return false if name is only spaces', () => {
    const review = { name: '   ', comment: 'Great place!' };
    expect(isValidReview(review)).toBe(false);
  });

  test('should return false if comment is only spaces', () => {
    const review = { name: 'Alice', comment: '   ' };
    expect(isValidReview(review)).toBe(false);
  });
});

