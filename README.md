My [Advent of Code](https://adventofcode.com/). This time in typescript.

Run it by confirming all the tests work.

```bash
npm run test
```

or

```bash
npm run test:watch
```

To run the benchmark on a given day, you need to transpile first, then run the js file:

```
npm run build && node build/<year>/<day>/benchmark.js
```

---

The general directory structure for code is `src/<year>/<day>/` and then there are some files:

- `index.ts` - All of the solutions, as well as an `inputData` variable containing the parsed input file for this day.
- `index.test.ts` - the tests
- `benchmark.ts` - benchmarks for the different solutions.

_My_ input data is in `inputs/<year>/<day>/input.txt`.

There are also some helpers in `src/`, with tests.
