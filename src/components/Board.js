import { useState } from "react";
import TASKS from "../__mock__/tasks.json";
import BurnBarel from "./BurnBarel";
import Column from "./Column";

const Board = () => {
  const [cards, setCards] = useState(TASKS);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        column="backlog"
        color="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        column="todo"
        color="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        column="inProgress"
        color="text-blue-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        column="done"
        color="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarel setCards={setCards} />
    </div>
  );
};

export default Board;
