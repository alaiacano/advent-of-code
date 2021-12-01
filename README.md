My [Advent of Code](https://adventofcode.com/). This time in typescript.

Run it by confirming all the tests work.

```bash
npm run test
```

or

```bash
npm run test:watch
```

---

The general directory structure for code is `src/<year>/<day>/` and then there are some files:

- `index.ts` - should generally hold the expected values, something to parse the input data, and any other common helpers.
- `part1.ts` and `part2.ts` - the solutions.
- `part1.test.ts` and `part2.test.ts` - the tests.

_My_ input data is in `inputs/<year>/<day>`.

There are also some helpers in `src/`, with tests.
