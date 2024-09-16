import { useState } from "react";
import Input from "../input/Input";
import "../../styles/Cards.css";

const RegisterProCard = ({ handleSubmitRegisterPro, error }) => {
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [trade, setTrade] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleDistrictChange = event => {
    setDistrict(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleTradeChange = event => {
    setTrade(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegisterPro(district, trade, email);
    setIsEmpty(!district || !trade || !email);
  };

  return (
    <form className="card">
      <div className="card-content">
        <label>Email</label>
        <Input type="email" placeholder="Email" onChange={handleEmailChange} />
        {!email && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>District</label>
        <Input
          type="text"
          placeholder="district"
          onChange={handleDistrictChange}
        />
        {!district && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
        <label>Trade</label>
        <Input
          type="password"
          placeholder="trade"
          onChange={handleTradeChange}
        />
        {!trade && isEmpty ? <p>This field is required</p> : null}
      </div>
      <button className="card-button" onClick={handleSubmit}>
        RegisterPro
      </button>
    </form>
  );
};

export default RegisterProCard;
