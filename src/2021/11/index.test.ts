import { part1, part2 } from ".";
import { lineReader } from "../../types";
function parseInput(input: string): number[][] {
  return input
    .split("\n")
    .map((line) => line.split("").map((d) => parseInt(d, 10)));
}
const demoInput = () =>
  parseInput(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);

test("larger demo works", () => {
  const afterOne = parseInput(`6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`);

  const afterTwo = parseInput(`8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`);

  expect(part1(demoInput(), 10, false).numFlashes).toStrictEqual(204);
  expect(part1(demoInput(), 100, false).numFlashes).toStrictEqual(1656);
});

const inputData = () =>
  lineReader(
    "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day11.txt",
    (line) => line
  ).map((l) => l.split("").map((ll) => parseInt(ll, 10)));

test("part 1 works", () => {
  expect(part1(inputData(), 100, false).numFlashes).toStrictEqual(1647);
});

test("part 2 demo works", () => {
  expect(part2(demoInput()).numSteps).toStrictEqual(195);
});

test("part 2 works", () => {
  expect(part2(inputData()).numSteps).toStrictEqual(348);
});
