import Todo from "./Todo";

function Main() {
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">모두 완료</label>
      <ul className="todo-list"></ul>
    </section>
  );
}

export default Main;
