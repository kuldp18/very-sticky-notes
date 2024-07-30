import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="px-5 py-2 text-lg">
        <ul className="flex gap-4 justify-between items-center">
          <div className="left">
            <li className="hover:text-white">
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="right flex gap-4">
            <li className="hover:text-white">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/register">Register</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/profile">Logout</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
