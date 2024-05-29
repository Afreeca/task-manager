import { useState } from "react";
import { convertCamelCase } from "../utils/convert";
import AddCard from "./AddCard";
import Card from "./Card";
import DropIndicator from "./DropIndicator";

const Column = ({ column, color, cards, setCards }) => {
  const [active, setActive] = useState(false); // State to track if the column is active (dragged over)

  // Handler for drag start event, sets the dragged card's data
  const handleDragStart = (e, data) => {
    e.dataTransfer.setData("data", data.id);
  };

  // Handler for drag over event, highlights the nearest drop indicator
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e); // Highlight the nearest drop indicator
    setActive(true); // Set column as active
  };

  // Handler for drag leave event, resets the active state and clears highlights
  const handleDragLeave = () => {
    setActive(false); // Set column as inactive
    clearHighlights(); // Clear all drop indicator highlights
  };

  // Handler for drag end event, processes the drop and transfers the card
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("data"); // Get the ID of the dragged card
    const indicators = getIndicators(); // Get all drop indicators in the column
    const { element } = getNearestIndicator(e, indicators); // Find the nearest drop indicator
    const before = element.dataset.before || "-1"; // Get the ID of the card before which the dragged card should be placed

    if (before !== cardId) {
      transferCard(cardId, column, before); // Transfer the card to the new position
    }

    setActive(false); // Set column as inactive
    clearHighlights(); // Clear all drop indicator highlights
  };

  // Highlights the nearest drop indicator based on the mouse position
  const highlightIndicator = (e) => {
    const indicators = getIndicators(); // Get all drop indicators in the column
    clearHighlights(indicators); // Clear existing highlights
    const nearest = getNearestIndicator(e, indicators); // Find the nearest drop indicator
    nearest.element.style.opacity = "1"; // Highlight the nearest drop indicator
  };

  // Clears all highlights from the drop indicators
  const clearHighlights = (els) => {
    const indicators = els || getIndicators(); // Get all drop indicators if not provided
    indicators.forEach((i) => (i.style.opacity = "0")); // Set opacity to 0 for all indicators to clear highlight
  };

  // Finds the nearest drop indicator based on the mouse position
  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50; // Offset to adjust the sensitivity of the nearest indicator detection

    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect(); // Get the bounding box of the indicator
        const offset = e.clientY - (box.top + DISTANCE_OFFSET); // Calculate the vertical offset from the mouse position to the indicator

        // If the offset is less than 0 (above the indicator) and greater than the current closest offset, update the closest indicator
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY, // Initial offset to compare against
        element: indicators[indicators.length - 1], // Default to the last indicator if no closer one is found
      }
    );
  };

  // Gets all drop indicators for the current column
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)); // Select all elements with the data attribute for the current column
  };

  // Transfers the card to the new position in the column
  const transferCard = (cardId, newColumn, before) => {
    let updatedCards = [...cards]; // Make a copy of the cards array
    let cardToTransfer = updatedCards.find((card) => card.id === cardId); // Find the card to transfer

    if (!cardToTransfer) return; // If the card is not found, do nothing

    cardToTransfer = { ...cardToTransfer, column: newColumn }; // Update the card's column
    updatedCards = updatedCards.filter((card) => card.id !== cardId); // Remove the card from its current position

    if (before === "-1") {
      updatedCards.push(cardToTransfer); // If the card should be moved to the end, add it to the end of the array
    } else {
      const insertAtIndex = updatedCards.findIndex(
        (card) => card.id === before
      ); // Find the index to insert the card
      if (insertAtIndex === undefined) return;
      updatedCards.splice(insertAtIndex, 0, cardToTransfer); // Insert the card at the specified position
    }

    setCards(updatedCards); // Update the state with the new cards array
  };

  // Filter the cards for the current column
  const filteredTasks = cards.filter((task) => task.column === column);
  // Convert the column name from camelCase to normal text
  const title = convertCamelCase(column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${color}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredTasks.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredTasks.map((task) => (
          <Card key={task.id} {...task} onDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard setCards={setCards} column={column} />
      </div>
    </div>
  );
};

export default Column;
