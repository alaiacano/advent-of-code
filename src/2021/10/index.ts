import "../../arrayExtensions";

const opening = new Set("([{<".split(""));
const closing = new Set(")]}>".split(""));
const closingPair: { [key: string]: string } = {
  "[": "]",
  "(": ")",
  "{": "}",
  "<": ">",
};

const openingPair: { [key: string]: string } = {
  "]": "[",
  ")": "(",
  "}": "{",
  ">": "<",
};

export const checkSyntax = (line: string): string | undefined => {
  const stack = [];
  let lastSeen = undefined;
  for (let letter of line) {
    if (opening.has(letter)) {
      stack.push(closingPair[letter]);
      continue;
    }

    if (stack.length === 0) {
      return lastSeen;
    }
    lastSeen = stack.pop();
    if (lastSeen !== letter) {
      return letter;
    }
  }
  return undefined;
};

export const part1 = (lines: string[]): number => {
  let sum = 0;
  lines.forEach((line) => {
    const syntaxError = checkSyntax(line);
    if (syntaxError !== undefined) {
      switch (syntaxError) {
        case ")":
          sum += 3;
          break;
        case "]":
          sum += 57;
          break;
        case "}":
          sum += 1197;
          break;
        case ">":
          sum += 25137;
          break;
      }
    }
  });
  return sum;
};

export const completeLine = (line: string): string => {
  const reversed: string = [...line].reverse().join("");
  const stack = [];
  let output = "";
  for (let letter of reversed) {
    if (closing.has(letter)) {
      stack.push(openingPair[letter]);
      continue;
    }

    if (stack.length === 0) {
      output += closingPair[letter];
    }
    stack.pop();
  }
  return output;
};

function scoreLine(line: string): number {
  const values: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  return line.split("").foldLeft((acc, letter) => 5 * acc + values[letter], 0);
}
export const part2 = (input: string[]): number => {
  const incomplete = input.filter((line) => checkSyntax(line) === undefined);
  const completedLines: number[] = incomplete
    .map(completeLine)
    .map(scoreLine)
    .sort((a, b) => a - b);

  return completedLines[Math.floor(completedLines.length / 2)];
};
