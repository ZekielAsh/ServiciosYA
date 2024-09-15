import { useState } from "react";
import Input from "../input/Input";
import "../../styles/Cards.css";

const LoginCard = ({ handleSubmitLogin, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitLogin(username, email, password);
    setIsEmpty(!username || !password);
  };

  return (
    <form className="card">
      <div className="card-content">
        {!isEmpty && error ? <p>{error}</p> : null}
        <label>Username</label>
        <Input
          type="text"
          placeholder="Username"
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
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        {!password && isEmpty ? <p>This field is required</p> : null}
      </div>
      <button className="card-button" onClick={handleSubmit}>
        Log In
      </button>
    </form>
  );
};

export default LoginCard;
