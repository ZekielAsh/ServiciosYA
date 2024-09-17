import { setUserRoleToLocalStorage } from "../../utils/localStorage.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterPro from "../../components/registerProCard/RegisterProCard.jsx";
import api from "../../services/api.js";
import "./RegisterProPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    api
      .getAllTrades()
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        setError(error.response.data.status);
      });
  }, []);

  const handleSubmitRegisterPro = (ditrict, trade, email) => {
    api
      .registerPro({ district: ditrict, trade: trade, email: email })
      .then(response => {
        setUserRoleToLocalStorage(response.data.currentRolDto);
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
          <RegisterPro
            handleSubmitRegisterPro={handleSubmitRegisterPro}
            options={options}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
