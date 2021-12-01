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

export const part2WindowFold = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return -1;
  }
  const sum = (a: number, b: number) => a + b;
  const sums = input.windowFoldLeft(
    3,
    { increments: 0, prev: 0 },
    (acc, slice) => {
      const { increments, prev } = acc;
      const newSum = slice.reduce(sum);
      return {
        increments: newSum > prev ? increments + 1 : increments,
        prev: newSum,
      };
    }
  );
  // need to subtract 1 because the first window will
  // always be higher than the initial accumulator value of zero.
  return sums.increments - 1;
};
