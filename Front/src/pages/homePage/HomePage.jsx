import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "../../utils/localStorage.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const email = getUserEmailFromLocalStorage();
    if (token) {
      api
        .getUserByEmail(email)
        .then(response => {
          console.log(response);
          setUser({
            username: response.data.nickName,
            token: token,
            district: response.data.userRoles.district,
            trade: response.data.userRoles.trade,
          });
        })
        .catch(e => {
          setModalMessage(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar user={user} />
      <div>
        <h1>Home Page</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/registerPro">RegisterPro</Link>
        <button onClick={() => localStorage.clear()}>Logout</button>
        {modalMessage && (
          <Modal message={modalMessage} setModalMessage={setModalMessage} />
        )}
      </div>
    </>
  );
};

export default HomePage;
