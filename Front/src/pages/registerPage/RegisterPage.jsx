import { setTokenToLocalStorage } from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "../../components/registerCard/RegisterCard.jsx";
import api from "../../utils/api.js";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitRegister = (username, password, email, image) => {
    api
      .register({ username, password, email, image })
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
          <Register handleSubmitRegister={handleSubmitRegister} error={error} />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
