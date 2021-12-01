import { PartAnswer } from "../../types";
import * as _ from "lodash";

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
