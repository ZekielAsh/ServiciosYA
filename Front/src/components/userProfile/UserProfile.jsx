import { getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const UserProfile = ({ user, setModalMessage, handleSwitchRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(user);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
  });

  const handleContactInfoChange = event => {
    const { name, value } = event.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const saveContactInfo = () => {
    const { email, phone, emailContact } = contactInfo; // Asegúrate de que contactInfo tenga estas propiedades

    api
      .addPhone(email, phone)
      .then(() => {
        console.log("Número de teléfono actualizado.");
        //setIsEditing(false);
      })
      .catch(error => {
        setModalMessage(error);
      });
    api
      .addMailContact(email, emailContact)
      .then(() => {
        console.log("Correo de contacto actualizado.");
        // setIsEditing(false);
      })
      .catch(error => {
        setModalMessage(error);
      });
  };

  // INFO DE CONTACTO
  const renderContactInfo = () => {
    const logedUserEmail = getUserEmailFromLocalStorage();

    // Condición para verificar si el usuario es el dueño del perfil
    const isProfileOwner = logedUserEmail === user.email;

    console.log("isProfileOwner", isProfileOwner);
    if (user.role === "PROFESSIONAL" && isProfileOwner && isEditing) {
      return (
        <>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={user.phoneNumber}
              onChange={handleContactInfoChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.contactEmail}
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
            <h3>Teléfono: {user.phoneNumber}</h3>
          </div>
          <div>
            <h3>Email: {user.contactEmail}</h3>
          </div>
          {user.role === "PROFESSIONAL" && isProfileOwner && (
            <button onClick={() => setIsEditing(true)}>Editar Contacto</button>
          )}
        </>
      );
    }
  };

  // OPCIONES DE PERFIL
  ////////////////////////////////////////////////////////////////////////
  const renderOptions = () => {
    switch (user.role) {
      case "CLIENT":
        console.log("CLIENT");
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
        console.log("PROFESSIONAL");
        return (
          <>
            <h3>Rol: {user.role}</h3>
            <h3>District: {user.district}</h3>
            <h3>Trade: {user.trade}</h3>
            {renderContactInfo()}
            <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
          </>
        );
    }
  };

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <div>
          <div>
            <h2>{user.username}</h2>
          </div>
          <div>{renderOptions()}</div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
