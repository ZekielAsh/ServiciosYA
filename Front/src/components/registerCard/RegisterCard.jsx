import { useState } from "react";
import Input from "../input/Input";
import "../../styles/Cards.css";

const RegisterCard = ({ handleSubmitRegister, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(""); // Averiguar como hacer para que sea un archivo
  const [isEmpty, setIsEmpty] = useState(false);

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleImageChange = event => {
    setImage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegister(username, password, email);
    setIsEmpty(!username || !password || !email || !image);
  };

  return (
    <form className="card">
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Username</label>
        <Input
          type="text"
          placeholder="username"
          onChange={handleUsernameChange}
        />
        {!username && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
        <label>Email</label>
        <Input type="email" placeholder="Email" onChange={handleEmailChange} />
        {!email && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
        <label>Password</label>
        <Input
          type="password"
          placeholder="password"
          onChange={handlePasswordChange}
        />
        {!password && isEmpty ? <p>This field is required</p> : null}
      </div>
      <div className="card-content">
        <label>DNI Image</label>
        <Input type="text" placeholder="image" onChange={handleImageChange} />
        {!image && isEmpty ? <p>This field is required</p> : null}
      </div>
      <button className="card-button" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
};

export default RegisterCard;
