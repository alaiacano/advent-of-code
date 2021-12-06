import { part1, inputData, lineParser } from ".";
import { DayAnswer } from "../../types";

const expected: DayAnswer = {
  partOneDemo: 5,
  partOne: 5124,
  partTwoDemo: 12,
  partTwo: 0,
};

const demoInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split("\n");

test("Runs part 1 Demo", () => {
  expect(part1(demoInput.map(lineParser), true)).toBe(expected.partOneDemo);
});

test("Runs part 1", () => {
  expect(part1(inputData, true)).toBe(expected.partOne);
});

// test("Runs part 2 Demo", () => {
//   expect(part1(demoInput.map(lineParser), false)).toBe(expected.partTwoDemo);
// });
