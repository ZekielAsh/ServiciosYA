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
  const [originalUsers, setOriginalUsers] = useState([]); // Estado para guardar los usuarios originales
  const [trades, setTrades] = useState([]); // Estado para los rubros
  const [selectedTrade, setSelectedTrade] = useState(""); // Rubro seleccionado
  const [districts, setDistricts] = useState([]); // Estado para los distritos
  const [selectedZone, setSelectedZone] = useState(""); // Zona seleccionada
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(""); // Barrio seleccionado
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

    // Cargar resultados de búsqueda originales
    api
      .searchProUsers(searchText)
      .then(response => {
        setUsers(response.data);
        setOriginalUsers(response.data); // Guardar los resultados originales
      })
      .catch(error => setModalMessage(error.response?.data?.error))
      .finally(() => setIsLoading(false));
  }, [searchText]);

  // Filtrar usuarios por rubro seleccionado o quitar filtro si se desmarca
  useEffect(() => {
    if (selectedTrade) {
      setIsLoading(true);
      api
        .getUserByTrade(selectedTrade)
        .then(response => setUsers(response.data))
        .catch(error => setModalMessage(error.response?.data?.error))
        .finally(() => setIsLoading(false));
    } else {
      setUsers(originalUsers); // Restaurar los usuarios originales si no hay rubro seleccionado
    }
  }, [selectedTrade]);

  // Filtrar usuarios por barrio seleccionado o quitar filtro si se desmarca
  useEffect(() => {
    if (selectedNeighborhood) {
      setIsLoading(true);
      api
        .getUserByDistrict(selectedNeighborhood) // Filtrar por barrio
        .then(response => setUsers(response.data))
        .catch(error => setModalMessage(error.response?.data?.error))
        .finally(() => setIsLoading(false));
    } else if (!selectedZone) {
      setUsers(originalUsers); // Restaurar los usuarios originales si no hay barrio ni zona seleccionada
    }
  }, [selectedNeighborhood, selectedZone]);

  // Manejar cambio de rubro con opción de desmarcar
  const handleTradeChange = (trade) => {
    if (selectedTrade === trade) {
      setSelectedTrade(""); // Desmarcar si se vuelve a seleccionar
    } else {
      setSelectedTrade(trade);
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
                  type="radio"
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
          <select onChange={(e) => handleZoneChange(e.target.value)}>
            <option value="">Seleccionar Zona</option>
            {districts.map(district => (
              <option key={district.zone} value={district.zone}>
                {district.zone}
              </option>
            ))}
          </select>

          {selectedZone && (
            <>
              <h3>Distritos en Zona {selectedZone}</h3>
              <ul>
                {districts
                  .find(d => d.zone === selectedZone)
                  ?.neighborhoods.map(neighborhood => (
                    <li key={neighborhood}>
                      <input
                        type="radio"
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
