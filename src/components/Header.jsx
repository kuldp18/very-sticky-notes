import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <header>
      <nav className="px-5 py-2 text-lg">
        <ul className="flex gap-4 justify-between items-center">
          <div className="left">
            {user ? (
              <li className="hover:text-white">
                <Link to="/">VeryStickyNotes</Link>
              </li>
            ) : (
              <li className="hover:text-white cursor-pointer">
                VeryStickyNotes
              </li>
            )}
          </div>
          <div className="right flex gap-4">
            {user ? (
              <>
                <li className="hover:text-white">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="hover:text-white">
                  <Link to="/profile">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-white">
                  <Link to="/login">Login</Link>
                </li>
                <li className="hover:text-white">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
