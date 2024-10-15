import { useState } from "react";
import { arrayDistrictsToOneObject } from "../../utils/functions";
import Select from "react-select";
import Button from "../button/Button";
import "../../styles/Cards.css";

const RegisterProCard = ({
  handleSubmitRegisterPro,
  error,
  options,
  districts,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const [trade, setTrade] = useState(null);
  const tradesOptions = options.map(option => ({
    value: option,
    label: option,
  }));

  const newDistricts = arrayDistrictsToOneObject(districts);

  const [zone, setZone] = useState(null);
  const zoneOptions = Object.keys(newDistricts).map(key => ({
    value: key,
    label: key,
  }));

  const [neighborhood, setNeighborhood] = useState(null);
  const neighborhoodOptions = newDistricts[zone]?.map(neighborhoodOption => ({
    value: neighborhoodOption,
    label: neighborhoodOption,
  }));

  const handleZoneChange = selectedOption => {
    setZone(selectedOption.value);
    setNeighborhood(null);
  };

  const handleNeighborhoodChange = selectedOption => {
    setNeighborhood(selectedOption);
  };

  const handleTradeChange = selectedOption => {
    setTrade(selectedOption.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegisterPro(neighborhood?.value, trade);
    setIsEmpty(!neighborhood || !trade || !zone);
  };

  return (
    <form className="card">
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        {(!zone || !neighborhood || !trade) && isEmpty ? (
          <p>Faltan completar campos</p>
        ) : null}
        <label>District</label>
        <Select onChange={handleZoneChange} options={zoneOptions}></Select>
        <Select
          value={neighborhood}
          onChange={handleNeighborhoodChange}
          options={neighborhoodOptions}
        ></Select>
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
