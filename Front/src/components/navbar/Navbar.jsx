import { Link } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";
import Button from "../button/Button";
import ServiciosYaLogo from "../../assets/ServiciosYA_Logo_-_Original_-_5000x5000_2.png";
import "./Navbar.css";
import { handleLogOut } from "../../services/auth/ProtectedRoute";

const Navbar = ({ user, handleSearch }) => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email"); 

  return (
    <nav className="nav-container">
      <div>
          <Link to="/" className="navbar-brand" >
              <img src={ServiciosYaLogo} width='90 px'
              height='60 px' alt="ServiciosYaLogo" className='logo'/>
          </Link>
      </div>
      <SearchInput onSearch={handleSearch} />
      {user ? (
        <div className="actions-container">
          <Link to={`/profile/${email}`}>
            <Button type={role === "CLIENT" ? "client" : "pro"}>
              {user.username[0].toUpperCase()}
            </Button>
          </Link>
          <Button type="primary" onClick={() => handleLogOut()}>
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
