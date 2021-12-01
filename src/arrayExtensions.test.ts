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

// TODO: more test cases! (classic)
