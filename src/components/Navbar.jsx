import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-icon">🎓</div>

        <div>
          <h2>EduEnroll</h2>
          <span>Higher Education Portal</span>
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;