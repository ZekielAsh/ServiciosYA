import {
  getTokenFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "../../utils/localStorage";
import { useState, useEffect } from "react";
import { handleLogOut } from "../../services/auth/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentSection from "../../components/commentSection/CommentSection";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import api from "../../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // hacer modal
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]); // Estado para las reseñas existentes

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const currentUserEmail = getUserEmailFromLocalStorage();
    if (token) {
      api
        .getUserByEmail(currentUserEmail)
        .then(response => {
          const userResp = response.data.userRoles;
          const professionalRole = userResp.find(
            role => role.role === "PROFESSIONAL"
          );

          setUser({
            username: response.data.nickName,
            token: token,
            email: currentUserEmail,
            district: professionalRole ? professionalRole.district : "", // Verifica si el rol existe
            trade: professionalRole ? professionalRole.trade : "", // Verifica si el rol existe
            roles: userResp.map(role => role.role),
            role: response.data.currentRolDto,
          });

          // Simular la obtención de la información de contacto del perfil visitado
          setContactInfo({
            phone: response.data.contactInfo
              ? response.data.contactInfo.phone
              : "",
            email: response.data.contactInfo
              ? response.data.contactInfo.contactMail
              : "",
          });

          // Simular la obtención de reseñas del backend
          setReviews(response.data.reviews || []);
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

  const buttonLabel = () => {
    return "Log Out";
  };

  const handleButton = () => {
    handleLogOutButton();
  };

  const handleLogOutButton = () => {
    handleLogOut();
    navigate("/");
  };

  const renderOptions = () => {
    switch (user?.role) {
      case "CLIENT":
        return (
          <>
            <h3>Rol: {user.role}</h3>
            {user.roles.length > 1 ? (
              <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
            ) : (
              <Link to="/registerPro">RegisterPro</Link>
            )}
          </>
        );
      case "PROFESSIONAL":
        return (
          <>
            <h3>Rol: {user.role}</h3>
            <h3>District: {user.district}</h3>
            <h3>Trade: {user.trade}</h3>
            {renderContactInfo()}
            <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
          </>
        );
      default:
        return <></>;
    }
  };

  // CHANGE ROLE
  const handleSwitchRole = () => {
    if (user.roles.length > 1) {
      const newRole = user.roles.find(role => role !== user.role);
      api
        .changeRole(user.email)
        .then(response => {
          setUser({ ...user, role: newRole });
        })
        .catch(error => {
          setError("No se pudo cambiar el rol. Por favor, intente nuevamente.");
        });
    }
  };

  // INFO DE CONTACTO
  ////////////////////////////////////////////////////////////////////////
  const handleContactInfoChange = e => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const saveContactInfo = () => {
    const { email, phone, emailContact } = contactInfo; // Asegúrate de que contactInfo tenga estas propiedades

    // Actualiza el número de teléfono
    api
      .addPhone(email, phone)
      .then(() => {
        console.log("Número de teléfono actualizado.");
        //setIsEditing(false);
      })
      .catch(error => {
        // console.log(error);
        // console.error('Error al actualizar el telefono:', error.response ? error.response.data : error.message);
        //setError(error.response.error);
        setError(error.response.data.error);
      });

    // Actualiza el correo de contacto
    api
      .addMailContact(email, emailContact)
      .then(() => {
        console.log("Correo de contacto actualizado.");
        // setIsEditing(false);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  };

  // INFO DE CONTACTO
  const renderContactInfo = () => {
    const currentUserEmail = getUserEmailFromLocalStorage();

    // Condición para verificar si el usuario es el dueño del perfil
    const isProfileOwner = currentUserEmail === user.email;

    if (user?.role === "PROFESSIONAL" && isProfileOwner && isEditing) {
      return (
        <>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactInfoChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={contactInfo.email}
              onChange={handleContactInfoChange}
            />
          </div>
          <button onClick={saveContactInfo}>Guardar</button>
        </>
      );
    } else {
      return (
        <>
          <div>
            <h3>Teléfono: {contactInfo.phone}</h3>
          </div>
          <div>
            <h3>Email: {contactInfo.email}</h3>
          </div>
          {user?.role === "PROFESSIONAL" && isProfileOwner && (
            <button onClick={() => setIsEditing(true)}>Editar Contacto</button>
          )}
        </>
      );
    }
  };
  ////////////////////////////////////////////////////////////////////////

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar user={user} />
      <h1>Profile</h1>
      {error ? <div>{error}</div> : null}
      {user && (
        <div>
          <div>
            <h2>{user.username}</h2>
          </div>
          <div>{renderOptions()}</div>
        </div>
      )}
      <CommentSection reviews={reviews} setReviews={setReviews} />
      <div>
        <button onClick={handleButton}>{buttonLabel()} </button>
      </div>
    </>
  );
};
export default Profile;
