import { Link } from "react-router-dom";
import UserInfo from "../../components/userInfo/UserInfo";
import "./UserProfile.css";

const UserProfile = ({
  comesFromRequest,
  profileUser,
  setProfileUser,
  logedUser,
  setModalMessage,
  handleSwitchRole,
}) => {
  
  const isProfileOwner = logedUser.email === profileUser.email;

  const isProfessional = profileUser.roles.length >= 2
  

  // CUANDO TENGA EL ENDPOINT DE TRAER REVIEWS TRAER EL COMPONENTE DE REVIEWS
  return (
    <div>
      <h1>Profile</h1>
      {profileUser && (
        <div>
          <div>
            <h2>{profileUser.username}</h2>
          </div>
          {!isProfessional  ? (
            isProfileOwner ? (
              isProfessional ? (
                <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
              ) : (
                <Link to="/registerPro">RegisterPro</Link>
              )
            ) : null
          ) : (
            <div>
              <UserInfo
                comesFromRequest={comesFromRequest}
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
    </div>
  );
};

export default UserProfile;
