import { removeItemsFromLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ServiciosYaLogo from "../../assets/ServiciosYA_Logo_-_Original_-_5000x5000_2.png";
import SearchInput from "../searchInput/SearchInput";
import Button from "../button/Button";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeItemsFromLocalStorage();
    navigate("/login");
  };

  const handleSearch = searchValue => {
    navigate(`/search/${searchValue}`);
  };

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Link to="/" className="navbar-brand">
          <img
            src={ServiciosYaLogo}
            width="90"
            height="60"
            alt="ServiciosYaLogo"
            className="logo"
          />
        </Link>
        {user == null ? (
          <div></div>
        ) : user.role === "PROFESSIONAL" ? (
          <Link to="/requestsPage">
            <button className="button">Servicios</button>
          </Link>
        ) : (
          <Link to="/requestsPage">
            <button className="button">Solicitudes</button>
          </Link>
        )}
      </div>
      <SearchInput onSearch={handleSearch} />
      {user ? (
        <div className="actions-container">
          <Link to={`/profile/${user.email}/${false}`}>
            <Button type={user.role === "CLIENT" ? "client" : "pro"}>
              {user.username[0].toUpperCase()}
            </Button>
          </Link>
          <button className="button" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      ) : (
        <div className="actions-container">
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );

};

export default Navbar;
