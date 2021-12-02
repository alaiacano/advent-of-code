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
npx tsc && node build/<year>/<day>/benchmark.js
```

---

The general directory structure for code is `src/<year>/<day>/` and then there are some files:

- `day<day>.ts` - helpers to parse the input data as well as the solutions `part1` and `part2` (and maybe some other approaches)
- `day<day>.test.ts` - the tests
- `benchmark.ts` - benchmarks for the different solutions.

_My_ input data is in `inputs/<year>/<day>/input.txt`.

There are also some helpers in `src/`, with tests.
