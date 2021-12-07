import { lineReader } from "../../types";

export const inputData: number[] = lineReader(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day7.txt",
  (l) => l
)[0]
  .split(",")
  .map((n) => parseInt(n, 10));

export const part1 = (
  positions: number[],
  increasingCost: boolean = false
): number => {
  // make a mapping from (distance) => accumulated cost to move that distance.
  // Each time a high distance is observed, we'll populate more of this mapping.
  // only used for part 2
  let costs: { [key: number]: number } = { 0: 0 };

  // Loop through all the positions and then all of the crabs to calculate the
  // total fuel cost for each position. This is O(n^2).
  let minFuel = Infinity;
  for (let position = 0; position < positions.length; position++) {
    let fuel = 0;
    for (let crab = 0; crab < positions.length; crab++) {
      const distance = Math.abs(positions[crab] - position);
      if (increasingCost && costs[distance] === undefined) {
        costs = { ...calculateCost(costs, distance) };
      }
      fuel += increasingCost === true ? costs[distance] : distance;
    }

    minFuel = Math.min(fuel, minFuel);
  }
  return minFuel;
};

// Starts at the highest known distance and goes up to the current distance.
export const calculateCost = (
  originalCosts: { [key: number]: number },
  distance: number
): { [key: number]: number } => {
  // make a copy so we don't mutate the original. Not sure if this is needed - we could
  // just mutate the input I think.
  const costs = Object.assign({}, originalCosts);
  let maxKey = 0;
  Object.keys(costs).forEach((k) => {
    maxKey = Math.max(maxKey, parseInt(k, 10));
  });
  let accum = costs[maxKey];
  for (let i = maxKey + 1; i <= distance; i++) {
    accum += i;
    costs[i] = accum;
  }
  return costs;
};
