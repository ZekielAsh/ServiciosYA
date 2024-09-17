import { useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import "../../styles/Cards.css";
import "./RegisterCard.css";

const RegisterCard = ({ handleSubmitRegister, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleFileChange = event => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("Ningún archivo seleccionado");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegister(username, password, email);
    setIsEmpty(
      !username ||
        !password ||
        !email ||
        !("Ningún archivo seleccionado" != fileName)
    );
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
        <div className="card-content-file-upload">
          <label htmlFor="dniImage" className="custom-file-upload">
            Upload File
          </label>
          <input
            id="dniImage"
            type="file"
            placeholder="DNIimage"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          <span id="file-name">{fileName}</span>
        </div>
        {!("Ningún archivo seleccionado" != fileName) && isEmpty ? (
          <p>There is no image uploaded</p>
        ) : null}
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Register
      </Button>
    </form>
  );
};

export default RegisterCard;
