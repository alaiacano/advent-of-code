import { part1, checkSyntax } from ".";
import { lineReader } from "../../types";

const demoInput: string[] = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split("\n");

const inputData = lineReader(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day10.txt",
  (line) => line
);

test("checkSyntax", () => {
  expect(checkSyntax(demoInput[0])).toBe(undefined);
  expect(checkSyntax(demoInput[1])).toBe(undefined);
  expect(checkSyntax(demoInput[2])).toBe("}");
  expect(checkSyntax(demoInput[3])).toBe(undefined);
  expect(checkSyntax(demoInput[4])).toBe(")");
  expect(checkSyntax(demoInput[5])).toBe("]");
  expect(checkSyntax(demoInput[6])).toBe(undefined);
  expect(checkSyntax(demoInput[7])).toBe(")");
  expect(checkSyntax(demoInput[8])).toBe(">");
  expect(checkSyntax(demoInput[9])).toBe(undefined);

  expect(checkSyntax(demoInput[4])).toBe(")");
});

test("part 1 demo", () => {
  expect(part1(demoInput)).toBe(26397);
});

test("part 1", () => {
  expect(part1(inputData)).toBe(167379);
});
