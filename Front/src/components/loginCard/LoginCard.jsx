import { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import "../../styles/Cards.css";

const LoginCard = ({ handleSubmitLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitLogin(email, password);
    setIsEmpty(!email || !password);
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
        <label>Password</label>
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        {!password && isEmpty ? <p>This field is required</p> : null}
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Log In
      </Button>
    </form>
  );
};

export default LoginCard;
