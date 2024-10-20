import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "../../utils/localStorage";
import ProInfoCard from "../../components/proInfoCard/ProInfoCard";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";
import "./SearchPage.css";

const SearchPage = () => {
  const searchText = useParams().text;
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [trades, setTrades] = useState([]); // Estado para los rubros
  const [selectedTrade, setSelectedTrade] = useState(""); // Rubro seleccionado
  const [districts, setDistricts] = useState([]); // Estado para los distritos
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Distrito seleccionado
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const email = getUserEmailFromLocalStorage();

    // Obtener la lista de rubros
    api
      .getAllTrades()
      .then(response => setTrades(response.data))
      .catch(error => setModalMessage(error.response?.data?.error));

    api
      .getAllDistricts()
      .then(response => setDistricts(response.data))
      .catch(error => setModalMessage(error.response?.data?.error));

    if (token) {
      api
        .getUserByEmail(email)
        .then(response => {
          const userResp = response.data.userRoles;
          const professionalRole = userResp.find(
            role => role.role === "PROFESSIONAL"
          );
          setUser({
            username: response.data.nickName,
            email: response.data.email,
            roles: userResp.map(role => role.role),
            district: professionalRole ? professionalRole.district : "", 
            trade: professionalRole ? professionalRole.trade : "",
            phoneNumber:
              response.data.phoneNumber == null
                ? ""
                : response.data.phoneNumber,
            contactEmail:
              response.data.contactMail == null
                ? ""
                : response.data.contactMail,
            role: response.data.currentRolDto,
          });
        })
        .catch(error => setModalMessage(error.response?.data?.error))
        .finally(() => {
          setIsLoading(false);
        });
    }

    // Cargar resultados de búsqueda
    api
      .searchProUsers(searchText)
      .then(response => setUsers(response.data))
      .catch(error => setModalMessage(error.response?.data?.error))
      .finally(() => setIsLoading(false));
  }, [searchText]);

  // Filtrar usuarios por rubro seleccionado
  useEffect(() => {
    if (selectedTrade) {
      setIsLoading(true);
      api
        .getUserByTrade(selectedTrade)
        .then(response => setUsers(response.data))
        .catch(error => setModalMessage(error.response?.data?.error))
        .finally(() => setIsLoading(false));
    }
  }, [selectedTrade]);// Filtrar usuarios por distrito seleccionado
  
  useEffect(() => {
    if (selectedDistrict) {
      setIsLoading(true);
      // Busca en los neighborhoods asociados al distrito seleccionado
      const district = districts.find(d => d.zone === selectedDistrict);
      if (district && district.neighborhoods.length > 0) {
        api
          .getUserByDistrict(district.neighborhoods) // Cambiar a getUserByNeighborhoods
          .then(response => setUsers(response.data))
          .catch(error => setModalMessage(error.response?.data?.error))
          .finally(() => setIsLoading(false));
      } else {
        setUsers([]); // Si no hay neighborhoods, no hay resultados
        setIsLoading(false);
      }
    }
  }, [selectedDistrict, districts]);

  const handleTradeChange = (trade) => {
    // Si el rubro ya está seleccionado, deselecciona
    if (selectedTrade === trade) {
      setSelectedTrade(""); // Deselecciona
    } else {
      setSelectedTrade(trade); // Selecciona el nuevo rubro
    }
  };
  
  const handleDistrictChange = (district) => {
    // Si el distrito ya está seleccionado, deselecciona
    if (selectedDistrict === district) {
      setSelectedDistrict(""); // Deselecciona
    } else {
      setSelectedDistrict(district); // Selecciona el nuevo distrito
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="search-page-container">
        <div className="search-sidebar">
          <h3>Rubro</h3>
          <ul>
            {trades.map(trade => (
              <li key={trade}>
                <input
                  type="radio" // Cambiar checkbox a radio button
                  name="trade" // Agrupar los radios por nombre
                  value={trade}
                  checked={selectedTrade === trade} // Verificar si el rubro está seleccionado
                  onChange={() => handleTradeChange(trade)}
                />
                <label>{trade}</label>
              </li>
            ))}
          </ul>
          <h3>Distritos</h3>
          <ul>
            {districts.map(district => (
              <li key={district.zone}> {/* Usamos 'zone' como clave única */}
                <input
                  type="radio"
                  name="district"
                  value={district.zone} // Usamos 'zone' como el valor del distrito
                  checked={selectedDistrict === district.zone}
                  onChange={() => handleDistrictChange(district.zone)} // Filtrar por la zona
                />
                <label>
                  {district.zone} 
                  {district.neighborhoods.length > 0 && 
                    ` (${district.neighborhoods.join(", ")})`}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="search-container-content">
          <div className="search-container-content-body flex-d-c">
            <div className="search-container-content-body-searchText">
              Search: <b>{searchText}</b>
            </div>
            <span className="search-container-content-body-text">Results:</span>
            {users.length === 0 ? (
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
