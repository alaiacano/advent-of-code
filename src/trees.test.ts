import { BinaryTree } from "./trees";

test("tree has the right root", () => {
  const t = new BinaryTree<number>();
  t.insert(4).insert(3).insert(5).insert(100).insert(1);
  expect(t.root?.value).toBe(4);
});

test("tree has the right children", () => {
  const t = new BinaryTree<number>();
  t.insert(4).insert(3).insert(5).insert(100).insert(1);
  expect(t.root?.right?.value).toBe(5);
  expect(t.root?.left?.value).toBe(3);
});

test("tree contains works", () => {
  const t = new BinaryTree<number>();
  t.insert(4).insert(3).insert(5).insert(100).insert(1);
  expect(t.contains(3)).toBe(true);
  expect(t.contains(4)).toBe(true);
  expect(t.contains(5)).toBe(true);
  expect(t.contains(100)).toBe(true);

  expect(t.contains(101)).toBe(false);
});
