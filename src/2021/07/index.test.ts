import { inputData, part1, calculateCost } from ".";
import { DayAnswer } from "../../types";

const expected: DayAnswer = {
  partOneDemo: 37,
  partOne: 328318,
  partTwoDemo: 168,
  partTwo: 89791146,
};

const demoInput = `16,1,2,0,4,2,7,1,2,14`
  .split(",")
  .map((l) => parseInt(l, 10));

test("Runs part 1 Demo", () => {
  expect(part1(demoInput, false)).toBe(expected.partOneDemo);
});
test("Runs part 1", () => {
  expect(part1(inputData, false)).toBe(expected.partOne);
});

test("Runs part 2 Demo", () => {
  expect(part1(demoInput, true)).toBe(expected.partTwoDemo);
});
test("Runs part 2", () => {
  expect(part1(inputData, true)).toBe(expected.partTwo);
});

test("calculateCost works", () => {
  let state: { [key: number]: number } = { 0: 0, 1: 1, 2: 3 };
  state = { ...calculateCost(state, 7) };
  expect(Object.keys(state).length).toBe(8);
  expect(state[2]).toBe(3);
  expect(state[3]).toBe(6);
  expect(state[4]).toBe(10);
  expect(state[5]).toBe(15);
  expect(state[6]).toBe(21);
  expect(state[7]).toBe(28);
  expect(state[8]).toBe(undefined);
});
