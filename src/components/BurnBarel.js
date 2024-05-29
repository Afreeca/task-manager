import React from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import DroppableArea from "./shared/DroppableArea";

const BurnBarel = ({ setCards }) => {
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("data");
    setCards((cards) => cards.filter((card) => card.id !== cardId));
  };

  return (
    <DroppableArea onDrop={handleDragEnd}>
      {(active) => (
        <div
          className={`mt-10 grid w-56 h-56 shrink-0 place-content-center rounded border text-3xl ${
            active
              ? "border-red-800 bg-red-800/20 text-red-500"
              : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
          }`}
        >
          {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
      )}
    </DroppableArea>
  );
};

export default BurnBarel;
