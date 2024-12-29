import React from 'react';
import { Rnd } from 'react-rnd';

const Block = ({ block, index, addBlock, deleteBlock, updateBlockPosition }) => {
  const handleDragStop = (e, d) => {
    const x = Math.min(Math.max(d.x, 0), window.innerWidth - 100); 
    const y = Math.min(Math.max(d.y, 0), window.innerHeight - 100); 
    updateBlockPosition(block.id, x, y);
  };

  return (
    <Rnd
      bounds="parent"
      size={{ width: 100, height: 100 }}
      position={{ x: block.x, y: block.y }}
      onDragStop={handleDragStop}
      className="absolute bg-pink-500 text-white flex items-center justify-center"
    >
      <div className="text-center relative z-10">
        <div>{index + 1}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addBlock(block.id); 
          }}
          className="mt-2 bg-pink-300 rounded px-2 mx-1"
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteBlock(block.id);
          }}
          className="mt-2 bg-pink-300 rounded px-2 mx-1"
        >
          -
        </button>
      </div>
    </Rnd>
  );
};

export default Block;
