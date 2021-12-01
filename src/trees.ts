interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

export class BinaryTree<T> {
  root: BinaryNode<T> | undefined;

  numItems: number = 0;

  insert = (value: T) => {
    this.numItems += 1;
    const newNode: BinaryNode<T> = { value: value };
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertIntoCurrentNode(newNode);
    }
    return this;
  };

  contains(value: T): boolean {
    const traverse = (node: BinaryNode<T>): boolean => {
      if (node.value === value) {
        return true;
      }
      if (node.right && node.value < value) {
        return traverse(node.right);
      } else {
        if (node.left && node.value > value) {
          return traverse(node.left);
        } else {
          return false;
        }
      }
    };
    return traverse(this.root as BinaryNode<T>);
  }

  private insertIntoCurrentNode(currentNode: BinaryNode<T>) {
    const { value } = currentNode;
    const traverse = (node: BinaryNode<T>) => {
      if (value > node.value) {
        // the value is greater than the current node's, so go right.
        if (!node.right) {
          node.right = currentNode;
        } else {
          traverse(node.right);
        }
      } else {
        // the value is the same or less than the node's value, so go left
        if (!node.left) {
          node.left = currentNode;
        } else {
          traverse(node.left);
        }
      }
    };
    traverse(this.root as BinaryNode<T>);
  }
}
