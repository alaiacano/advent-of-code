import { DayAnswer } from "../../types";
import { lineParser, part1, part2, Step, inputData } from "./day2";

const expected: DayAnswer = {
  partOneDemo: 150,
  partOne: 1660158,
  partTwoDemo: 900,
  partTwo: 1604592846,
};

const demo: Step[] = `forward 5
down 5
forward 8
up 3
down 8
forward 2`
  .split("\n")
  .map(lineParser);

test("runs part 1 demo code", () => {
  expect(part1(demo)).toBe(expected.partOneDemo);
});

test("runs part 1", () => {
  expect(part1(inputData)).toBe(expected.partOne);
});

test("runs part 2 demo code", () => {
  expect(part2(demo)).toBe(expected.partTwoDemo);
});

test("runs part 2", () => {
  expect(part2(inputData)).toBe(expected.partTwo);
});
