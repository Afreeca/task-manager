import React, { useState } from "react";

const DroppableArea = ({ onDrop, children }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e) => {
    onDrop(e);
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`drag-container`}
    >
      {children(active)}
    </div>
  );
};

export default DroppableArea;
