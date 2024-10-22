import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "../../utils/localStorage";
import BackgroundSection from "../../components/backgroundSection/BackgroundSection";
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
  const [originalUsers, setOriginalUsers] = useState([]);
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [sortedUsers, setSortedUsers] = useState(users);
  const [sortOrder, setSortOrder] = useState('default');

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

    // Obtener los profesionales
    api
      .getProfessionalsByFilters(searchText, selectedTrade, selectedNeighborhood)
      .then(response => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setOriginalUsers(response.data);
      })
      .catch(error => setModalMessage(error.response?.data?.error))
      .finally(() => setIsLoading(false));
  }, [searchText, selectedTrade, selectedNeighborhood]);

  // Manejar cambio de rubro con opción de desmarcar
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);

    if (value === 'asc') {
      const sortedAsc = [...users].sort((a, b) =>
        a.nickName.localeCompare(b.nickName)
      );
      setSortedUsers(sortedAsc);
    } else if (value === 'desc') {
      const sortedDesc = [...users].sort((a, b) =>
        b.nickName.localeCompare(a.nickName)
      );
      setSortedUsers(sortedDesc);
    } else {
      setSortedUsers([...users]); // Si se selecciona "default", restablecemos el orden inicial
    }
  };

  // Manejar cambio de zona
  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    setSelectedNeighborhood(""); // Reiniciar el barrio seleccionado al cambiar la zona
  };

  // Manejar selección de un barrio con opción de desmarcar
  const handleNeighborhoodChange = (neighborhood) => {
    if (selectedNeighborhood === neighborhood) {
      setSelectedNeighborhood(""); // Desmarcar si se vuelve a seleccionar
    } else {
      setSelectedNeighborhood(neighborhood);
    }
  };

  const handleTradeChange = (trade) => {
    if (selectedTrade === trade) {
      setSelectedTrade(""); // Desmarcar si se vuelve a seleccionar
    } else {
      setSelectedTrade(trade);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackgroundSection />
      <Navbar user={user} />
      <div className="search-page-container">
        <div className="search-sidebar">
          <h3>Rubro</h3>
          <ul className="list">
            {trades.map(trade => (
              <li key={trade}>
                <input
                  type="checkbox"
                  name="trade"
                  value={trade}
                  checked={selectedTrade === trade}
                  onChange={() => handleTradeChange(trade)}
                />
                <label>{trade}</label>
              </li>
            ))}
          </ul>
          <h3>Zona</h3>
            <div className="select-zone-container">
              <select onChange={(e) => handleZoneChange(e.target.value)}>
                <option value="">Seleccionar Zona</option>
                {districts.map(district => (
                  <option key={district.zone} value={district.zone}>
                    {district.zone}
                  </option>
                ))}
              </select>
            </div>
              
            {selectedZone && (
              <>
                <h3>Distritos en Zona {selectedZone}</h3>
                <ul className="list">
                  {districts
                    .find(d => d.zone === selectedZone)
                    ?.neighborhoods.map(neighborhood => (
                      <li key={neighborhood}>
                        <input
                          type="checkbox"
                          name="neighborhood"
                          value={neighborhood}
                          checked={selectedNeighborhood === neighborhood}
                          onChange={() => handleNeighborhoodChange(neighborhood)}
                        />
                        <label>{neighborhood}</label>
                      </li>
                    ))}
                </ul>
              </>
            )}
        </div>
        <div className="search-container-content">
          <div className="search-container-content-header">
            <div className="sort-select-container">
              <div className="sort-title">Ordenar</div>
              <div className="sort-select-list">
                <select id="sortSelect" onChange={handleSortChange}>
                  <option value="default">Seleccionar</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            </div>
          </div>
          <div className="search-container-content-body flex-d-c">
            {sortedUsers.length === 0 ? (
              <div className="search-container-content-body-users">
                No se encontraron resultados
              </div>
            ) : (
              <div className="search-container-content-body-users">
                {sortedUsers.map(userPro => (
                  <ProInfoCard key={userPro.email} userPro={userPro} />
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
