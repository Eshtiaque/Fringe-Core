import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Block from './Components/Block';
import Line from './Components/Line';



const App = () => {
  const [blocks, setBlocks] = useState([
    { id: uuidv4(), parentId: null, x: 100, y: 100 },
  ]);

  const addBlock = useCallback((parentId) => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      {
        id: uuidv4(),
        parentId,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100)
      },
    ]);
  }, []);

  const deleteBlock = useCallback((id) => {
    const getAllChildren = (blocks, parentId) => {
      const children = blocks.filter((block) => block.parentId === parentId);
      let allChildren = [...children];
      children.forEach((child) => {
        allChildren = [...allChildren, ...getAllChildren(blocks, child.id)];
      });
      return allChildren;
    };

    setBlocks((prevBlocks) => {
      const childrenToDelete = getAllChildren(prevBlocks, id);
      return prevBlocks.filter(
        (block) => block.id !== id && !childrenToDelete.some(child => child.id === block.id)
      );
    });
  }, []);

  const updateBlockPosition = useCallback((id, x, y) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  }, []);

  return (
    <div className="relative w-screen h-screen bg-pink-200 overflow-hidden">
      {blocks.map(
        (block) =>
          block.parentId && (
            <Line
              key={block.id}
              from={blocks.find((b) => b.id === block.parentId)}
              to={block}
            />
          )
      )}
      {blocks.map((block, index) => (
        <Block
          index={index}
          key={block.id}
          block={block}
          addBlock={addBlock}
          deleteBlock={deleteBlock}
          updateBlockPosition={updateBlockPosition}
        />
      ))}
    </div>
  );
};

export default App;
