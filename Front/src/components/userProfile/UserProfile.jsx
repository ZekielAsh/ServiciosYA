import { Link } from "react-router-dom";
import UserInfo from "../../components/userInfo/UserInfo";
import api from "../../services/api";

const UserProfile = ({
  profileUser,
  setProfileUser,
  logedUser,
  setModalMessage,
}) => {
  const isProfileOwner = logedUser.email === profileUser.email;

  const handleSwitchRole = () => {
    api
      .changeRole(logedUser.email)
      .then(response => {
        setProfileUser(prevUser => ({
          ...prevUser,
          role: response.data.currentRolDto,
          district: response.data.district,
          trade: response.data.trade,
          phoneNumber:
            response.data.phoneNumber == null ? "" : response.data.phoneNumber,
          contactEmail:
            response.data.contactMail == null ? "" : response.data.contactMail,
        }));
        setModalMessage("Rol cambiado con éxito.");
      })
      .catch(error => {
        setModalMessage(error.message);
      });
  };

  // CUANDO TENGA EL ENDPOINT DE TRAER REVIEWS TRAER EL COMPONENTE DE REVIEWS
  return (
    <>
      <h1>Profile</h1>
      {profileUser && (
        <div>
          <div>
            <h2>{profileUser.username}</h2>
          </div>
          {profileUser.role === "CLIENT" ? (
            isProfileOwner ? (
              profileUser.roles.length > 1 ? (
                <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
              ) : (
                <Link to="/registerPro">RegisterPro</Link>
              )
            ) : null
          ) : (
            <div>
              <h3>District: {profileUser.district}</h3>
              <h3>Trade: {profileUser.trade}</h3>
              <UserInfo
                profileUser={profileUser}
                setProfileUser={setProfileUser}
                isProfileOwner={isProfileOwner}
                setModalMessage={setModalMessage}
              />
              {isProfileOwner ? (
                <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
