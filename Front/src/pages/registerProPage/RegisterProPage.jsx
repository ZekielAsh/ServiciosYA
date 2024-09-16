import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterPro from "../../components/registerProCard/RegisterProCard.jsx";
import api from "../../services/api.js";
import "./RegisterProPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitRegisterPro = (ditrict, trade, email) => {
    api
      .registerPro({ district: ditrict, trade: trade, email: email })
      .then(response => {
        console.log(response);
        navigate("/", { replace: true });
      })
      .catch(error => {
        console.log(error.response);
        setError(error.response);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-card">
          <RegisterPro
            handleSubmitRegisterPro={handleSubmitRegisterPro}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
