import { FC } from "react";
import { ToDoList } from "./models/todolist";
import React from "react";

export const Item: FC<{
  item: ToDoList;
  onClick: (b: ToDoList) => void;
}> = ({ item, onClick }) => {
  return (
    <button role="button" className="btn btn-secondary" onClick={() => onClick(item)}>
      {item.title}
    </button>
  );
};
