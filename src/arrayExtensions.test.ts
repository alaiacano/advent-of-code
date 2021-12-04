import "./arrayExtensions";

test("Slices an array into length-2", () => {
  const demo = [1, 2, 3, 4, 5, 6, 7, 8];
  const expected = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
  ];
  const slices = demo.sliding(2);

  expect(slices).toStrictEqual(expected);
});

test("Set Intersection", () => {
  const s1 = new Set([1, 2, 4]);
  const s2 = new Set([1, 5]);
  expect(s1.intersection(s2)).toStrictEqual(new Set([1]));
  expect(s2.intersection(s1)).toStrictEqual(new Set([1]));
});

// TODO: more test cases! (classic)
