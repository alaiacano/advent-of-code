import { lineReader } from "../../types";

type Direction = "up" | "down" | "forward";

export type Step = {
  direction: Direction;
  units: number;
};

export const lineParser = (l: string): Step => {
  const [dir, unit] = l.split(" ", 2);
  return { direction: dir as Direction, units: parseInt(unit, 10) };
};

export const inputData = lineReader<Step>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/02/input.txt",
  lineParser
);

export const part1 = (inputs: Step[]): number => {
  let forwardTotal = 0,
    depthTotal = 0;

  for (let step of inputs) {
    switch (step.direction) {
      case "up":
        depthTotal -= step.units;
        break;
      case "down":
        depthTotal += step.units;
        break;
      case "forward":
        forwardTotal += step.units;
        break;
    }
  }
  return forwardTotal * depthTotal;
};

export const part2 = (inputs: Step[]): number => {
  let forwardTotal = 0,
    depthTotal = 0,
    aim = 0;

  for (let step of inputs) {
    switch (step.direction) {
      case "up":
        aim -= step.units;
        break;
      case "down":
        aim += step.units;
        break;
      case "forward":
        forwardTotal += step.units;
        depthTotal += step.units * aim;
        break;
    }
  }
  return forwardTotal * depthTotal;
};
