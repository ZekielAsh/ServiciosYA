import { useState } from "react";
import Select from "react-select";
import Button from "../button/Button";
import Input from "../input/Input";
import "../../styles/Cards.css";

const RegisterProCard = ({ handleSubmitRegisterPro, error, options, districts}) => {
  const [district, setDistrict] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [trade, setTrade] = useState(null);
  const tradesOptions = options.map(option => ({
    value: option,
    label: option,
  }));

  console.log(options)
  console.log(districts)

  const handleDistrictChange = event => {
    setDistrict(event.target.value);
  };

  const handleTradeChange = selectedOption => {
    setTrade(selectedOption.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegisterPro(district, trade);
    setIsEmpty(!district || !trade);
  };

  return (
    <form className="card">
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        {!district && isEmpty ? <p>Faltan completar campos</p> : null}
        <label>District</label>
        <Input
          type="text"
          placeholder="district"
          onChange={handleDistrictChange}
        />
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


