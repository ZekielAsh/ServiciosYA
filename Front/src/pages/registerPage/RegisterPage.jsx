import {
  setTokenToLocalStorage,
  setUserRoleToLocalStorage,
} from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "../../components/registerCard/RegisterCard.jsx";
import api from "../../services/api.js";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitRegister = (username, password, email) => {
    api
      .register({ userName: username, email: email, password: password })
      .then(response => {
        setTokenToLocalStorage(response.headers["authorization"]);
        setUserRoleToLocalStorage(response.data.userRoles[0]);
        navigate("/", { replace: true });
      })
      .catch(error => {
        setError(error.response.data.status);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-card">
          <Register handleSubmitRegister={handleSubmitRegister} error={error} />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
