import Todo from "./Todo";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const todosSelector = (state) => state.todos.items;
const filterTypeSelector = (state) => state.todos.filterType;
const filteredTodosSelector = createSelector(
  todosSelector,
  filterTypeSelector,
  (items, filterType) => {
    switch (filterType) {
      case "do":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
);

function Main() {
  const todos = useSelector(filteredTodosSelector);
  const Todos = todos.map((todo) => <Todo key={todo.id} {...todo} />);

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">모두 완료</label>
      <ul className="todo-list">{Todos}</ul>
    </section>
  );
}

export default Main;
