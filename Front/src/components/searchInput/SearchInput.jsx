import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../icons/SearchIcon";
import { useState } from "react";
import Input from "../input/Input";
import "./SearchInput.css";

const SearchInput = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onClick = () => {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
      onSearch(searchValue);
    }
  };

  const onEnter = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className="search-container">
      <Input
        type="text"
        placeholder="Buscar"
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={e => onEnter(e)}
      />
      <div onClick={onClick} className="search-icon-container">
        <SearchIcon color="var(--color-blue-dark)" />
      </div>
    </div>
  );
};

export default SearchInput;
