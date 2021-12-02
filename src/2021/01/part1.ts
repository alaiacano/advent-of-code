import { PartAnswer } from "../../types";

export const solution = (input: number[], gap: number): PartAnswer => {
  let increases = 0;
  for (let i = gap; i <= input.length; i++) {
    if (input[i] > input[i - gap]) {
      increases += 1;
    }
  }
  return increases;
};

export const part1 = (input: number[]): PartAnswer => {
  return solution(input, 1);
};
