import { useState } from "react";

const Folder = ({
  handleInsertNode,
  handleUpdateNode,
  handleDeleteNode,
  explorer,
}) => {
  // console.log(explorer);

  const [expand, setExpand] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(explorer.name);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);

    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onEditSubmit = (e) => {
    if (e.keyCode === 13 && editValue.trim()) {
      handleUpdateNode(explorer.id, editValue.trim());
      setEditMode(false);
    }
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          {editMode ? (
            <input
              type="text"
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={onEditSubmit}
              onBlur={() => setEditMode(false)}
              style={{
                fontSize: "1rem",
                padding: "2px 4px",

                borderRadius: "4px",
                width: "90px",
                height: "12px",
              }}
            />
          ) : (
            <span>📁{explorer.name}</span>
          )}

          <div>
            <button onClick={() => setEditMode(true)}>✏️</button>
            <button onClick={() => handleDeleteNode(explorer.id)}>
              🗑️
            </button>
          </div>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder+</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File+</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"} </span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                className="inputContainer_input"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleUpdateNode={handleUpdateNode}
                handleDeleteNode={handleDeleteNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file"> 📄{explorer.name}</span>;
  }
};

export default Folder;
