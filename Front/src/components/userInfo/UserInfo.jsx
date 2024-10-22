import { useState } from "react";
import { toast } from "react-toastify"; 
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
  const [socialMedia, setSocialMedia] = useState(profileUser.socialMedia);

  const isProfessional = profileUser.roles.length >= 2;
  const comesFromRequestBoolean = comesFromRequest.toLowerCase() === "true";

  const handlePhoneNumberChange = event => {
    setPhoneNumber(event.target.value);
  };

  const handleContactEmailChange = event => {
    setContactEmail(event.target.value);
  };

  const handleSocialMediaChange = event => {
    setSocialMedia(event.target.value);
  };

  const handleSaveContactInfo = () => {
    // Guardar teléfono
    api
      .addPhone(profileUser.email, phoneNumber)
      .then(responseOne => {
        // Guardar correo solo si la primera petición fue exitosa
        return api.addMailContact(profileUser.email, contactEmail).then(responseTwo => {
          setProfileUser(prevUser => ({
            ...prevUser,
            phoneNumber: responseOne.data.phoneNumber,
            contactEmail: responseTwo.data.contactMail,
          }));

          api.addSocialMedia(profileUser.email, socialMedia).then(responseThree => {
            setProfileUser(prevUser => ({
              ...prevUser,
              socialMedia: responseThree.data.socialMedia,
            }));
          });
          // Notificar éxito
          toast.success("Información de contacto actualizada correctamente");
          // Salir del modo edición
          setIsEditing(false);
        });
      })
      .catch(error => {
        // Notificar error
        toast.error(error.response?.data?.error || "Error al actualizar la información");
      });
  };

  return (
    <>
      {isProfileOwner ? (
        profileUser.role === "PROFESSIONAL" ? (
          <div>
            <div>
              <h3>District: {profileUser.district}</h3>
            </div>
            <div>
              <h3>Trade: {profileUser.trade}</h3>
            </div>
            <div>
              <p>Teléfono: </p>
              <p>
                {isEditing ? (
                  <input
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
            <div>
              <p>Email: </p>
              <p>
                {isEditing ? (
                  <input
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

            {/* Red Social */}
            <div>
              <p>Redes Sociales:</p>
              <p>
                {isEditing ? (
                  <input
                    type="text"
                    name="socialMedia"
                    value={socialMedia}
                    onChange={handleSocialMediaChange}
                  />
                ) : (
                  socialMedia
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
            <h3>District: {profileUser.district}</h3>
          </div>
          <div>
            <h3>Trade: {profileUser.trade}</h3>
          </div>
          <div>
            <h3>Teléfono: {profileUser.phoneNumber}</h3>
          </div>
          <div>
            <h3>Email: {profileUser.email}</h3>
          </div>
          <div>
            <h3>Redes Sociales: {profileUser.socialMedia}</h3>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserInfo;
