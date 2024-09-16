import { setTokenToLocalStorage } from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginCard from "../../components/loginCard/LoginCard.jsx";
import api from "../../services/api.js";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitLogin = (email, password) => {
    api
      .login({ password: password, email: email })
      .then(response => {
        setTokenToLocalStorage(response.headers["authorization"]);
        navigate("/", { replace: true });
      })
      .catch(error => {
        setError(error.response.data.title);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-card">
          <LoginCard handleSubmitLogin={handleSubmitLogin} error={error} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
