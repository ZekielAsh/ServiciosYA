import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenFromLocalStorage, getUserEmailFromLocalStorage } from "../../utils/localStorage";
import ProInfoCard from "../../components/proInfoCard/ProInfoCard";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";
import "./SearchPage.css";

const SearchPage = () => {
  const text = useParams().text;
  const [searchText, setSearchText] = useState(text);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const handleSearch = searchValue => {
    setSearchText(searchValue);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const email = getUserEmailFromLocalStorage();
    if (token) {
      api
        .getUserByEmail(email)
        .then(response => {
          const userResp = response.data.userRoles;
          setUser({
            username: response.data.nickName,
            token: token,
            district: userResp.district,
            trade: userResp.trade,
            role: response.data.currentRolDto
          });
        })
        .catch(e => {
          setModalMessage(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        })};
    api.searchProUsers(searchText)
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      setModalMessage(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
      }, [searchText]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} handleSearch={handleSearch}/>
      <div className="search-page-container">
        <div className="search-container-content">
          <div className="search-container-content-body flex-d-c">
            <div className="search-container-content-body-searchText">
              Search: <b>{searchText}</b>
            </div>
            <span className="search-container-content-body-text">Results:</span>
            {users.length == 0 ? (
              <div className="search-container-content-body-users">
                No se encontraron resultados
              </div>
            ) : (
              <div className="search-container-content-body-users">
                {users.map(user => (
                  <ProInfoCard key={user.email} userPro={user} />
                ))}
              </div>
            )}
          </div>
        </div>
        {modalMessage && (
          <Modal message={modalMessage} setModalMessage={setModalMessage} />
        )}
      </div>
    </>
  );
};

export default SearchPage;
