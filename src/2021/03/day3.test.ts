import { DayAnswer } from "../../types";
import { part1, part2, inputData } from "./day3";

const expected: DayAnswer = {
  partOneDemo: 198,
  partOne: 2954600,
  partTwoDemo: 230,
  partTwo: 1662846,
};

const demo: string[] = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split("\n");

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
