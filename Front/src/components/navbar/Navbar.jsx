import { Link } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";
import Button from "../button/Button";
import "./Navbar.css";

const Navbar = ({ user, handleSearch }) => {
  const role = localStorage.getItem("role");

  return (
    <nav className="nav-container">
      <SearchInput onSearch={handleSearch} />
      {user ? (
        <div className="actions-container">
          <Link to={`/profile/${user.id}`}>
            <Button type={role === "CLIENT" ? "client" : "pro"}>
              {user.username[0].toUpperCase()}
            </Button>
          </Link>
          <Button type="primary" onClick={() => localStorage.clear()}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="actions-container">
          <Link to="/register">
            <Button type="primary">Register</Button>
          </Link>
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
