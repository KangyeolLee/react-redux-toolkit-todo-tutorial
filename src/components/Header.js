import { add as addTodo } from "../states/todos";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Header() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    if (!(e.keyCode === 13 || e.key === "Enter")) return;

    const text = todo.trim();
    if (!text) return;

    setTodo("");
    dispatch(addTodo(text));
  };

  return (
    <header className="header">
      <h1>TODOs</h1>
      <input
        value={todo}
        onInput={(e) => setTodo(e.target.value)}
        onKeyDown={handleAddTodo}
        className="todo-input"
        placeholder="할 일 목록을 입력하세요..."
        autoFocus
      />
    </header>
  );
}

export default Header;
