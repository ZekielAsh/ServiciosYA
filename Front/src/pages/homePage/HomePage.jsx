import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
  removeTokenFromLocalStorage,
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
          const userResp = response.data.userRoles[0];
          setUser({
            username: response.data.nickName,
            token: token,
            district: userResp.district,
            trade: userResp.trade,
            role: userResp.getRole()
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

  const renderOptions = () => {
    switch (user?.role) {
      case "Cliente":
        return (
          <>
            <Link to="/registerPro">RegisterPro</Link>
            <button onClick={() => removeTokenFromLocalStorage}>Logout</button>
          </>
        );
      case "Profesional":
        return (
          <>
            <button onClick={() => removeTokenFromLocalStorage}>Logout</button>
          </>
        );
      default:
        return (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        );
    }
  };

  const description = {
    
  };

  return (
    <>
      <Navbar user={user} />
      <div>
        <h1>Home Page</h1>
        {renderOptions()}
        {modalMessage && (
          <Modal message={modalMessage} setModalMessage={setModalMessage} />
        )}
      </div>
      <div>
      {/* Descripción del Home */}
        <section>
          <h1>Bienvenido a <strong>ServiciosYa</strong></h1>
          <p>
            <strong>ServiciosYa</strong> es la solución perfecta para quienes buscan profesionales confiables para reparaciones 
            y mejoras en el hogar. Nuestra misión es facilitar el proceso de encontrar, contactar y reservar servicios de calidad, 
            para que puedas enfocarte en lo que realmente importa.
          </p>
          <h2>¿Por qué creamos ServiciosYa?</h2>
          <p>
            Nos dimos cuenta de lo difícil que es encontrar profesionales confiables para trabajos del hogar, 
            como plomeros o electricistas. Queremos cambiar eso, conectándote directamente con expertos que se adaptan 
            a tus necesidades y superan tus expectativas.
          </p>
        </section>

        {/* Cómo Funciona */}
        <section>
          <h2>¿Cómo Funciona?</h2>
          <ol>
            <li><strong>Búsqueda Inteligente:</strong> Utiliza nuestro buscador para encontrar profesionales de confianza, ya sea por nombre o por el tipo de servicio que necesitas.</li>
            <li><strong>Perfiles Detallados:</strong> Cada profesional tiene su propio perfil, donde podrás encontrar formas de contacto, información sobre su experiencia y opiniones de otros usuarios.</li>
            <li><strong>Reseñas de Clientes:</strong> Después de utilizar un servicio, podrás dejar tu reseña para ayudar a otros a tomar decisiones informadas.</li>
          </ol>
        </section>

        {/* Pie de Página */}
        <footer>
          <p><strong>ServiciosYa - Conectando Calidad y Conveniencia</strong></p>
          <p>Encuentra los mejores profesionales del hogar, desde electricistas hasta plomeros, en solo unos clics. ¡Tu satisfacción es nuestra prioridad!</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
