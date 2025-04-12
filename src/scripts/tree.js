class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}

// Creating tree nodes
const root = new TreeNode("Root");
const child1 = new TreeNode("Child 1");
const child2 = new TreeNode("Child 2");

root.addChild(child1);
root.addChild(child2);

console.log(JSON.stringify(root, null, 2));  // Display tree structure
