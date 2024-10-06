import { Link } from "react-router-dom";
import UserInfo from "../../components/userInfo/UserInfo";
import "./UserProfile.css";

const UserProfile = ({
  profileUser,
  setProfileUser,
  logedUser,
  setModalMessage,
  handleSwitchRole,
}) => {
  const isProfileOwner = logedUser.email === profileUser.email;

  // CUANDO TENGA EL ENDPOINT DE TRAER REVIEWS TRAER EL COMPONENTE DE REVIEWS
  return (
    <div>
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
    </div>
  );
};

export default UserProfile;
