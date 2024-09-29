import {
  setTokenToLocalStorage,
  setUserRoleToLocalStorage,
  setUserEmailToLocalStorage,
} from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "../../components/registerCard/RegisterCard.jsx";
import api from "../../services/api.js";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitRegister = (username, password, email, file) => {
    const formData = new FormData();
    formData.append("userName", username);
    formData.append("email", email);
    formData.append("password", password);

    if (file) {
      formData.append("dniImage", file); // La clave "dniImage" debe coincidir con lo que espera el backend
    }

    api
      .register(formData)
      .then(response => {
        setTokenToLocalStorage(response.headers["authorization"]);
        setUserRoleToLocalStorage(response.data.currentRolDto);
        setUserEmailToLocalStorage(response.data.email);
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
