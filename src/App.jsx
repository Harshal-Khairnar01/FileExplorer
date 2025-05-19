import "./index.css";
import { useState } from "react";
import explorer from "./data/folderData.js";
import Folder from "./components/Folder";

import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, updateNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleUpdateNode = (folderId, newName) => {
    const finalTree = updateNode(explorerData, folderId, newName);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (id) => {
    // console.log(id,"hh");
    const finalTree = deleteNode(explorerData, id);
    if (finalTree === null) {
      alert("Root folder deleted. Resetting file system.");
      // Optional: reinitialize root
      setExplorerData({
        id: new Date().getTime(),
        name: "root",
        isFolder: true,
        items: [],
      });
    } else {
      setExplorerData(finalTree);
    }
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleUpdateNode={handleUpdateNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </div>
  );
}
