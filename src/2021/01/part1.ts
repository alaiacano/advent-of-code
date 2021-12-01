import { PartAnswer } from "../../types";
export const part1 = (input: number[]): PartAnswer => {
  let increases = 0;
  for (let i = 1; i <= input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases += 1;
    }
  }
  return increases;
};
