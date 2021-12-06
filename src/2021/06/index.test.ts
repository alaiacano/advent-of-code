import { inputData, part1 } from ".";
import { DayAnswer } from "../../types";

const expected: DayAnswer = {
  partOneDemo: 5934,
  partOne: 389726,
  partTwoDemo: 26984457539,
  partTwo: 19771,
};

const demoInput = `3,4,3,1,2`.split(",").map((l) => parseInt(l, 10));

test("Runs part 1 Demo", () => {
  expect(part1(demoInput, 18)).toBe(26);
  expect(part1(demoInput, 80)).toBe(expected.partOneDemo);
});

test("Runs part 1", () => {
  expect(part1(inputData, 80)).toBe(expected.partOne);
});

test("Runs part 2 demo", () => {
  expect(part1(demoInput, 256)).toBe(expected.partOne);
});

test("Runs part 2", () => {
  expect(part1(inputData, 256)).toBe(expected.partOne);
});
