import { PartAnswer } from "../../types";
import "../../arrayExtensions";
import * as _ from "lodash";
import { part1 } from "./part1";

export const part2 = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return -1;
  }

  let totalIncreases = 0;

  for (let i = 3; i <= input.length; i++) {
    const prevWindow = input[i - 3] + input[i - 2] + input[i - 1];
    const currWindow = input[i - 2] + input[i - 1] + input[i];
    if (currWindow > prevWindow) {
      totalIncreases += 1;
    }
  }
  return totalIncreases;
};

export const part2Sliding = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return -1;
  }
  const sum = (a: number, b: number) => a + b;
  const sums = input.slidingApply(3, (s) => s.reduce(sum));
  return part1(sums);
};
