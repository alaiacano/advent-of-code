const { part1 } = require("./part1.ts");
import { expected } from ".";
import { lineReader } from "../../types";

// test("runs part 1 demo code", () => {
//   const demo = [1721, 979, 366, 299, 675, 1456];
//   expect(part1(demo)).toBe(expected.partOneDemo);
// });

test("runs part 1", () => {
  const data = lineReader<number>(
    "/Users/adam/github/alaiacano/advent-of-code/inputs/2020/01/part1.txt",
    (l: string) => parseInt(l, 10)
  );
  expect(part1(data)).toBe(expected.partOne);
});
