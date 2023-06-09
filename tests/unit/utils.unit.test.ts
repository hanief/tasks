import { generateRandomInteger } from "~/utils";

describe('Utils test', () => {
  test('should generate random integer', () => {
    const randomInteger = generateRandomInteger(1, 10);
    expect(randomInteger).toBeGreaterThanOrEqual(1);
    expect(randomInteger).toBeLessThanOrEqual(10);
  });
})