import * as fs from "fs";

export type PartAnswer = number | string;

export type DayAnswer = {
  partOne?: PartAnswer;
  partOneDemo?: PartAnswer;
  partTwo?: PartAnswer;
  partTwoDemo?: PartAnswer;
};

export function lineReader<T>(
  file: string,
  lineConverter: (line: string) => T
): T[] {
  return fs.readFileSync(file, "utf8").trimEnd().split("\n").map(lineConverter);
}
