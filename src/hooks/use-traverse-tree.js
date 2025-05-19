const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, nodeId) {
     if (tree.id === nodeId) {
    return null; 
  }
    const filteredItems = tree.items
      .filter((item) => item.id !== nodeId)
      .map((item) => deleteNode(item, nodeId));
    return { ...tree, items: filteredItems };
  }

  function updateNode(tree, folderId, newName) {
    if (tree.id === folderId) {
      return { ...tree, name: newName };
    }
    let updatedItems = tree.items.map((item) =>
      updateNode(item, folderId, newName)
    );
    return { ...tree, items: updatedItems };
  }

  return { insertNode, deleteNode, updateNode };
};
export default useTraverseTree;
