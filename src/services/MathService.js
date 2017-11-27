// @flow
export const roundToDecimalPlace = (number: number, place: number = 2): number =>
  Math.round(number * 10 * place) / (10 * place);
