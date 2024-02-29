const NavBar = () => {
  
  return (
    <nav className="navbar-list">
      <ul className="navbar-list">
      
        <li className="dropdown">
          <button className="dropdown-toggle">ABOUT US 👇👇👇👇</button>
          <ul className="dropdown-menu">
            <li>
              <a href="/">HOME 😊</a>
            </li>
            <li>
              <a href="/exercise-daily-routine">EXERCISES ROUTINE😊</a>
            </li>
            <li>
              <a href="/add-exercise">ADD EXERCISE FORM 😊</a>
            </li>
            <li>
              <a href="/comments">REVIEWS 💙😊</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;