export function generateRandomInteger(start = 10000, end = 99999) {
  return Math.floor(Math.random() * (end - start) + start);
}
