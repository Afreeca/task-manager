import React from "react";
import DropIndicator from "./DropIndicator";
import MotionWrapper from "./MotionWrapper";

const Card = ({ title, id, column, onDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <MotionWrapper
        draggable
        layoutId={id}
        onDragStart={(e) => onDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </MotionWrapper>
    </>
  );
};

export default Card;
