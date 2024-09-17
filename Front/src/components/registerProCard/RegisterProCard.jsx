import { useState } from "react";
import Select from "react-select";
import Button from "../button/Button";
import Input from "../input/Input";
import "../../styles/Cards.css";

const RegisterProCard = ({ handleSubmitRegisterPro, error, options }) => {
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [trade, setTrade] = useState(null);
  const tradesOptions = options.map(option => ({
    value: option,
    label: option,
  }));

  const handleDistrictChange = event => {
    setDistrict(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleTradeChange = selectedOption => {
    setTrade(selectedOption.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(district, trade, email);
    handleSubmitRegisterPro(district, trade, email);
    setIsEmpty(!district || !trade || !email);
  };

  return (
    <form className="card">
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Email</label>
        <Input type="email" placeholder="Email" onChange={handleEmailChange} />
        {!email && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
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
        <Select onChange={handleTradeChange} options={tradesOptions}></Select>
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Register Pro
      </Button>
    </form>
  );
};

export default RegisterProCard;
