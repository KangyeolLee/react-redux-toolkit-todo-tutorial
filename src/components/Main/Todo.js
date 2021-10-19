import {
  check as checkTodo,
  edit as editTodo,
  remove as removeTodo,
} from "../../states/todos";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";

function getClassName({ done, isEdit }) {
  const classNames = [];
  if (done) {
    classNames.push("completed");
  }

  if (isEdit) {
    classNames.push("editing");
  }

  return classNames.join(" ");
}

function Todo({ id, done, text }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(text);
  const [isEdit, setEdit] = useState(false);
  const $input = useRef(null);

  useEffect(() => {
    if (isEdit) {
      $input.current.focus();
    }
  }, [isEdit]);

  const edit = () => {
    const text = value.trim();
    if (!text) return;

    setEdit(false);
    dispatch(editTodo({ id, text }));
  };

  const handleEnter = (e) => {
    if (!(e.keyCode === 13 || e.key === "Enter")) return;

    edit();
  };

  const className = getClassName({ done, isEdit });

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={(e) =>
            dispatch(checkTodo({ id, checked: e.target.checked }))
          }
        />
        <label onDoubleClick={() => setEdit(true)}>{text}</label>
        <input
          className="edit"
          onInput={(e) => setValue(e.target.value)}
          onKeyDown={handleEnter}
          onBlur={() => setEdit(false)}
          ref={$input}
          value={value}
        />
        <button className="destroy" onClick={() => dispatch(removeTodo(id))}>
          제거
        </button>
      </div>
    </li>
  );
}

export default Todo;
