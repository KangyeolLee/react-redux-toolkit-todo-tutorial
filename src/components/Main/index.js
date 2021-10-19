import { useDispatch, useSelector } from "react-redux";

import Todo from "./Todo";
import { createSelector } from "@reduxjs/toolkit";
import { toggleAll } from "../../states/todos";

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

const isAllCheckedSelector = (state) =>
  state.todos.items.every((todo) => todo.done);

function Main() {
  const dispatch = useDispatch();
  const todos = useSelector(filteredTodosSelector);
  const Todos = todos.map((todo) => <Todo key={todo.id} {...todo} />);

  const isAllChecked = useSelector(isAllCheckedSelector);

  return (
    <section className="main">
      <div className="input-wrapper">
        <input
          checked={isAllChecked}
          onChange={(e) => dispatch(toggleAll(e.target.checked))}
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
        />
        <label htmlFor="toggle-all">모두 체크</label>
      </div>
      <ul className="todo-list">
        {Todos.length > 0 ? (
          Todos
        ) : (
          <li className="warning-message">Oops! 해당 목록이 없습니다.</li>
        )}
      </ul>
    </section>
  );
}

export default Main;
