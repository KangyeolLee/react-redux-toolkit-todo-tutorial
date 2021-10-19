import { check as checkTodo } from "../../states/todos";
import { useDispatch } from "react-redux";

function Todo({ id, done, text }) {
  const dispatch = useDispatch();

  return (
    <li className={done ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={(e) =>
            dispatch(checkTodo({ id, checked: e.target.checked }))
          }
        />
        <label>{text}</label>
        <button className="destroy" />
      </div>
      <input className="edit" value="투두 타닷타닷타" />
    </li>
  );
}

export default Todo;
