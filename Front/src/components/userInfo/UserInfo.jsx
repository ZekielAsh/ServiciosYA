import { useState } from "react";
import "./Userinfo.css";
import api from "../../services/api";

const UserInfo = ({
  comesFromRequest,
  profileUser,
  setProfileUser,
  isProfileOwner,
  setModalMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(profileUser.phoneNumber);
  const [contactEmail, setContactEmail] = useState(profileUser.contactEmail);

  const isProfessional = profileUser.roles.length >= 2
  const comesFromRequestBoolean = (comesFromRequest.toLowerCase() === 'true'); // javascript decidio que mi booleano se tiene que parsear a string, aca lo hago booleano de vuelta
  const handlePhoneNumberChange = event => {
    setPhoneNumber(event.target.value);
  };

  const handleContactEmailChange = event => {
    setContactEmail(event.target.value);
  };

  const handleSaveContactInfo = () => {
    api
      .addPhone(profileUser.email, phoneNumber)
      .then(responseOne => {
        api
          .addMailContact(profileUser.email, contactEmail)
          .then(responseTwo => {
            setProfileUser(prevUser => ({
              ...prevUser,
              phoneNumber: responseOne.data.phoneNumber,
              contactEmail: responseTwo.data.contactMail,
            }));
          })
          .catch(error => {
            setModalMessage(error.response.data.error);
          })
          .finally(() => {
            setIsEditing(false);
          });
      })
      .catch(error => {
        setModalMessage(error.response.data.error);
      });
  };

  return (
    <>
      {isProfileOwner ? (
        profileUser.role === "PROFESSIONAL" ? (
          <div className="div-ac">
            <div>
              <h3 className="div-p">District: {profileUser.district}</h3>
            </div>
            <div className="div-ac">
             <h3>Trade: {profileUser.trade}</h3>
            </div>
            <div className="div-ac">
              <p className="infoContact">Teléfono: </p>
              <p>
                {isEditing ? (
                  <input
                    className="inputStyle"
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                ) : (
                  phoneNumber
                )}
              </p>
            </div>
            <div className="div-ac">
              <p>Email: </p>
              <p>
                {isEditing ? (
                  <input
                    className="inputStyle"
                    type="text"
                    name="contactEmail"
                    value={contactEmail}
                    onChange={handleContactEmailChange}
                  />
                ) : (
                  contactEmail
                )}
              </p>
            </div>
            {isEditing ? (
              <button onClick={handleSaveContactInfo}>Guardar</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                Editar Contacto
              </button>
            )}
          </div>
        ) : null 
      ) : isProfessional && !comesFromRequestBoolean ? (
        <div>
          <div>
            <h3 className="div-p">District: {profileUser.district}</h3>
          </div>
          <div>
            <h3 className="div-ac">Trade: {profileUser.trade}</h3>
          </div>
          <div>
            <h3 className="div-ac">Teléfono: {profileUser.phoneNumber}</h3>
          </div>
          <div>
            <h3 className="div-ac">Email: {profileUser.email}</h3>
          </div>
        </div>
      ) : null} 
    </>
  );
};

export default UserInfo;
