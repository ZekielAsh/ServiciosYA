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
  const [socialMedia, setSocialMedia] = useState(profileUser.socialMedia || [""]);

  const isProfessional = profileUser.roles.length >= 2;
  const comesFromRequestBoolean = comesFromRequest.toLowerCase() === "true";

  const handlePhoneNumberChange = event => {
    setPhoneNumber(event.target.value);
  };

  const handleContactEmailChange = event => {
    setContactEmail(event.target.value);
  };

  // Manejar cambios en los enlaces de redes sociales
  const handleSocialMediaChange = (index, event) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index] = event.target.value;
    setSocialMedia(newSocialMedia);
  };

  // Agregar una nueva red social
  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, ""]);
    console.log(socialMedia);
  };

  // Eliminar una red social
  const handleRemoveSocialMedia = (index) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    setSocialMedia(newSocialMedia);
  };

  const handleSaveContactInfo = () => {
    // Normalizar URLs para asegurarse de que comiencen con "https://"
    const normalizedSocialMedia = socialMedia.map((link) => {
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        return `https://${link}`;
      }
      return link;
    });

    // Guardar teléfono y correo
    api
      .addPhone(profileUser.email, phoneNumber)
      .then(responseOne => {
        return api.addMailContact(profileUser.email, contactEmail).then(responseTwo => {
          setProfileUser(prevUser => ({
            ...prevUser,
            phoneNumber: responseOne.data.phoneNumber,
            contactEmail: responseTwo.data.contactMail,
          }));
          console.log(normalizedSocialMedia);
          // Guardar redes sociales normalizadas
          api.addSocialMedia(profileUser.email, normalizedSocialMedia).then(responseThree => {
            setProfileUser(prevUser => ({
              ...prevUser,
              socialMedia: responseThree.data.socialMedia,
            }));
            console.log(responseThree.data.socialMedia);
            console.log("No llega");
          });
          toast.success("Información de contacto actualizada correctamente");
          setIsEditing(false);
        });
      })
      .catch(error => {
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

            {/* Redes Sociales */}
            <div>
              <p>Redes Sociales:</p>
              {isEditing ? (
                <>
                  {socialMedia.map((social, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name={`socialMedia-${index}`}
                        value={social}
                        onChange={(event) => handleSocialMediaChange(index, event)}
                        placeholder="https://example.com"
                      />
                      <button onClick={() => handleRemoveSocialMedia(index)}>Eliminar</button>
                    </div>
                  ))}
                  <button onClick={handleAddSocialMedia}>Agregar Red Social</button>
                </>
              ) : (
                socialMedia.map((social, index) => (
                  <p key={index}>
                    <a
                      href={social.startsWith("http://") || social.startsWith("https://") ? social : `https://${social}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social}
                    </a>
                  </p>
                ))
              )}
            </div>

            {isEditing ? (
              <button onClick={handleSaveContactInfo}>Guardar</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Editar Contacto</button>
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
            <h3>Redes Sociales:</h3>
            {socialMedia.map((social, index) => (
              <p key={index}>
                <a
                  href={social.startsWith("http://") || social.startsWith("https://") ? social : `https://${social}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social}
                </a>
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserInfo;
