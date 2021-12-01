import { PartAnswer } from "../../types";
import "../../arrayExtensions";
import * as _ from "lodash";
import { part1 } from "./part1";

/**
 * A pretty straight-forward approach to loop through the index and check if the previous 3 are higher
 * than the lagged 3.
 */
export const part2 = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return 0;
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

/**
 * I made `Array.prototype.slidingApply` to break the array into length-3 sub-arrays
 * and then perform an aggregation function on the sub-array (sum). Now I have an array containing the
 * sums of each window, which I send into the part1 solution to find how many increase from one element
 * to the next.
 */
export const part2Sliding = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return 0;
  }
  const sum = (a: number, b: number) => a + b;
  const sums = input.slidingApply(3, (s) => s.reduce(sum));
  return part1(sums);
};

/**
 * OK, now I made a `Array.prototype.windowFoldLeft` function that works like a normal
 * foldLeft, which has the signature `foldLeft<A, B>(z: B, fn((b: B, a: A) => B)): B` and instead
 * returns `A[]`, which in this case is the next 3-element sub-array.
 *
 * The accumulator `B` needs to hold both the previous sum and the number of times we've incremented.
 */
export const part2WindowFold = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return 0;
  }
  const sum = (a: number, b: number) => a + b;
  const increments = input.windowFoldLeft(
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
  return increments.increments - 1;
};

/**
 * Take 4: I was made aware that you don't need to sum each window because two of the items overlap
 * between each window. So taking the difference of the items on either side of them (items `i` and `i-3`)
 * is sufficient.
 *
 * This optimization can be applied to all of the solutions.
 */
export const part2WindowFoldNoSum = (input: number[]): PartAnswer => {
  if (input.length < 4) {
    return 0;
  }
  const increments = input.windowFoldLeft(
    3,
    { increments: 0, prev: 0 },
    (acc, slice) => {
      const { increments, prev } = acc;
      const newVal = slice[2];
      return {
        increments: newVal > prev ? increments + 1 : increments,
        prev: slice[0],
      };
    }
  );
  // need to subtract 1 because the first window will
  // always be higher than the initial accumulator value of zero.
  return increments.increments - 1;
};
