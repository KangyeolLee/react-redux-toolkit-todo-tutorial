function Nav() {
  return (
    <nav className="nav">
      <span className="todo-count">남은 항목 : 0</span>
      <ul className="filter-options">
        <li>
          <a className="selected" href="#/">
            모두
          </a>
        </li>
        <li>
          <a href="#/active">미완</a>
        </li>
        <li>
          <a href="#/completed">완료</a>
        </li>
      </ul>
      <button className="clear-button">완료항목 제거</button>
    </nav>
  );
}

export default Nav;
