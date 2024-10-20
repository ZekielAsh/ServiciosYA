import { setUserRoleToLocalStorage } from "../../utils/localStorage.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterPro from "../../components/registerProCard/RegisterProCard.jsx";
import api from "../../services/api.js";
import "./RegisterProPage.css";

const RegisterProPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    api
      .getAllTrades()
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }, []);

  useEffect(() => {
    api
      .getAllDistricts()
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }, []);

  const handleSubmitRegisterPro = (ditrict, trade) => {
    let email = localStorage.getItem("email");
    api
      .registerPro({ district: ditrict, trade: trade, email: email })
      .then(response => {
        setUserRoleToLocalStorage(response.data.currentRolDto);
        navigate("/", { replace: true });
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-card">
          <RegisterPro
            handleSubmitRegisterPro={handleSubmitRegisterPro}
            options={options}
            districts={districts}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterProPage;
