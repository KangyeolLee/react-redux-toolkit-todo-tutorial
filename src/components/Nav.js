import {
  clearCompleted as clearCompletedTodo,
  filter as filterTodo,
} from "../states/todos";
import { useDispatch, useSelector } from "react-redux";

const filterTypeSelector = (state) => state.todos.filterType;
const todoCountSelector = (state) =>
  state.todos.items.filter((todo) => !todo.done).length;

function Nav() {
  const dispatch = useDispatch();
  const filterType = useSelector(filterTypeSelector);
  const todoCount = useSelector(todoCountSelector);

  return (
    <nav className="nav">
      <span className="todo-count">남은 항목 : {todoCount}</span>
      <ul className="filter-options">
        <li>
          <a
            className={filterType === "all" ? "selected" : ""}
            onClick={() => dispatch(filterTodo("all"))}
            href="#/"
          >
            모두
          </a>
        </li>
        <li>
          <a
            className={filterType === "do" ? "selected" : ""}
            onClick={() => dispatch(filterTodo("do"))}
            href="#/active"
          >
            미완
          </a>
        </li>
        <li>
          <a
            className={filterType === "done" ? "selected" : ""}
            onClick={() => dispatch(filterTodo("done"))}
            href="#/completed"
          >
            완료
          </a>
        </li>
      </ul>
      <button
        onClick={() => dispatch(clearCompletedTodo())}
        className="clear-button"
      >
        완료항목 제거
      </button>
    </nav>
  );
}

export default Nav;
