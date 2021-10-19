function Header() {
  return (
    <header className="header">
      <h1>TODOs</h1>
      <input
        className="todo-input"
        placeholder="할 일 목록을 입력하세요..."
        autoFocus
      />
    </header>
  );
}

export default Header;
