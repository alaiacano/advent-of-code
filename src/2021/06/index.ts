import _ from "lodash";
import { lineReader } from "../../types";

export const inputData: number[] = lineReader(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day6.txt",
  (l) => l
)[0]
  .split(",")
  .map((n) => parseInt(n, 10));

export const part1 = (input: number[], iterations: number): number => {
  // initial state is a mapping of: timer -> fish with that timer state
  let state: { [key: number]: number } = {};
  _.range(0, 9).forEach((f) => (state[f] = 0));

  // load the initial input
  input.forEach((fish) => (state[fish] += 1));

  for (let i = 0; i < iterations; i++) {
    // we need to decrease the timer for all fish by moving the number from state[t] to state[t-1]
    // and also need to wrap anything from t[0] to t[6] then add that many to t[8]
    const numberCreated = state[0];
    _.range(1, 9).forEach((t) => {
      state[t - 1] = state[t];
    });
    state[6] += numberCreated;
    state[8] = numberCreated;
  }

  return Object.keys(state).reduce((acc, key) => {
    return acc + state[parseInt(key)];
  }, 0);
};
