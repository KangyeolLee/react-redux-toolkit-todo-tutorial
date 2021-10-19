function Todo(props) {
  return (
    <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" checked />
        <label>자바스크립트 핥짝!</label>
        <button className="destroy" />
      </div>
      <input className="edit" value="투두 타닷타닷타" />
    </li>
  );
}

export default Todo;
