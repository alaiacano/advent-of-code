import { DayAnswer } from "../../types";
import { inputData } from ".";
const {
  part1,
  part2,
  part2Sliding,
  part2WindowFold,
  part2WindowFoldNoSum,
} = require(".");

export const expected: DayAnswer = {
  partOneDemo: 7,
  partOne: 1655,
  partTwoDemo: 5,
  partTwo: 1683,
};

test("runs part 1 demo code", () => {
  const demo = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  expect(part1(demo)).toBe(expected.partOneDemo);
});

test("runs part 1", () => {
  expect(part1(inputData)).toBe(expected.partOne);
});

test("runs part 2 demo code", () => {
  const demo = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  expect(part2(demo)).toBe(expected.partTwoDemo);
});

test("runs part 2", () => {
  expect(part2(inputData)).toBe(expected.partTwo);
});

test("runs part 2 using the sliding apply", () => {
  expect(part2Sliding(inputData)).toBe(expected.partTwo);
});

test("runs part 2 using the window foldLeft without summing!", () => {
  expect(part2WindowFoldNoSum(inputData)).toBe(expected.partTwo);
});
