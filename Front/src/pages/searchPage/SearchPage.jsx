import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProInfoCard from "../../components/proInfoCard/ProInfoCard";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";
import "./SearchPage.css";

const SearchPage = () => {
  const text = useParams().text;
  const [searchText, setSearchText] = useState(text);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const handleSearch = searchValue => {
    setSearchText(searchValue);
  };

  useEffect(() => {
    api
      .searchProUsers(searchText)
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
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
      <Navbar handleSearch={handleSearch} />
      <div className="search-page-container">
        <div className="search-container-content">
          <div className="search-container-content-body flex-d-c">
            <div className="search-container-content-body-searchText">
              Search: <b>{searchText}</b>
            </div>
            <span className="search-container-content-body-text">Results</span>
            {!users ? (
              <div className="search-container-content-body-users">
                No results
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
