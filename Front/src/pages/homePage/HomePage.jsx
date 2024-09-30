import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "../../utils/localStorage.js";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";
import "./HomePage.css";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

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
            email: response.data.email,
            roles: userResp.map(role => role.role),
            district: userResp.district,
            trade: userResp.trade,
            role: response.data.currentRolDto,
            phone: response.data.phoneNumber ? "" : response.data.phoneNumber,
            contactEmail: response.data.contactMail
              ? ""
              : response.data.contactMail,
          });
        })
        .catch(error => {
          setModalMessage(error.message);
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
      <div className="home-body">
        <h1>Home Page</h1>
        {modalMessage && (
          <Modal message={modalMessage} setModalMessage={setModalMessage} />
        )}
        {/* Descripción del Home */}
        <h1>
          Bienvenido a <strong>ServiciosYa</strong>
        </h1>
        <div className="home-body-description">
          <p>
            <strong>ServiciosYa</strong> es la solución perfecta para quienes
            buscan profesionales confiables para reparaciones y mejoras en el
            hogar. Nuestra misión es facilitar el proceso de encontrar,
            contactar y reservar servicios de calidad, para que puedas enfocarte
            en lo que realmente importa.
          </p>
          <h2>¿Por qué creamos ServiciosYa?</h2>
          <p>
            Nos dimos cuenta de lo difícil que es encontrar profesionales
            confiables para trabajos del hogar, como plomeros o electricistas.
            Queremos cambiar eso, conectándote directamente con expertos que se
            adaptan a tus necesidades y superan tus expectativas.
          </p>
        </div>
        {/* Cómo Funciona */}
        <h2>¿Cómo Funciona?</h2>
        <div className="home-body-description">
          <ul>
            <li>
              <strong>Búsqueda Inteligente:</strong> Utiliza nuestro buscador
              para encontrar profesionales de confianza, ya sea por nombre o por
              el tipo de servicio que necesitas.
            </li>
            <li>
              <strong>Perfiles Detallados:</strong> Cada profesional tiene su
              propio perfil, donde podrás encontrar formas de contacto,
              información sobre su experiencia y opiniones de otros usuarios.
            </li>
            <li>
              <strong>Reseñas de Clientes:</strong> Después de utilizar un
              servicio, podrás dejar tu reseña para ayudar a otros a tomar
              decisiones informadas.
            </li>
          </ul>
        </div>
        {/* Pie de Página */}
        <div className="home-footer">
          <span>© 2024 ServiciosYa. Todos los derechos reservados.</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
