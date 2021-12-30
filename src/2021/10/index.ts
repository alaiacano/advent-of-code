const opening = new Set("([{<".split(""));

const closingPair: { [key: string]: string } = {
  "[": "]",
  "(": ")",
  "{": "}",
  "<": ">",
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
