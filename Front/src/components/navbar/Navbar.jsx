import { removeItemsFromLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ServiciosYaLogo from "../../assets/ServiciosYA_Logo_-_Original_-_5000x5000_2.png";
import SearchInput from "../searchInput/SearchInput";
import Button from "../button/Button";
import { AiFillAlert } from "react-icons/ai";
import "./Navbar.css";
import UserProfile from "../userProfile/UserProfile";

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
    <Link to="/requestsPage">
        <Button  type="primary">
          Servicios
        </Button>
    </Link>
  </div>
  <SearchInput onSearch={handleSearch} />
  {user ? (
    <div className="actions-container">
      <Link to={`/profile/${user.email}`}>
        <Button type={user.role === "CLIENT" ? "client" : "pro"}>
          {user.username[0].toUpperCase()}
        </Button>
      </Link>
      <Button type="primary" onClick={handleLogOut}>
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
