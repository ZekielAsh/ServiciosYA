import { getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RequestDescriptionBox from "../../components/requestDescriptionBox/requestDecriptionBox";
import BackgroundSection from "../../components/backgroundSection/BackgroundSection";
import CommentSection from "../../components/commentSection/CommentSection";
import UserProfile from "../../components/userProfile/UserProfile";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api";
import "./ProfilePage.css";

const Profile = () => {
  // MODIFICAR EL AUTHPATH YA QUE NECESITAS ESTAR LOGEADO
  const params = useParams();
  const [logedUser, setLogedUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isDescriptionBoxVisible, setIsDescriptionBoxVisible] = useState(false);
  const comesFromRequest = params.comesFromRequest;
  useEffect(() => {
    const userProfileEmail = params.email;
    const comesFromRequest = params.comesFromRequest;
    const logedUserEmail = getUserEmailFromLocalStorage();

    api
      .getUserByEmail(userProfileEmail)
      .then(response => {
        const userResp = response.data.userRoles;
        const professionalRole = userResp.find(
          role => role.role === "PROFESSIONAL"
        );
        setProfileUser({
          username: response.data.nickName,
          email: response.data.email,
          roles: userResp.map(role => role.role),
          district: professionalRole ? professionalRole.district : "", // Verifica si el rol existe
          trade: professionalRole ? professionalRole.trade : "", // Verifica si el rol existe
          phoneNumber:
            response.data.phoneNumber == null ? "" : response.data.phoneNumber,
          contactEmail:
            response.data.contactMail == null ? "" : response.data.contactMail,
          role: response.data.currentRolDto,
        });
        api
          .getUserByEmail(logedUserEmail)
          .then(response => {
            const userResp = response.data.userRoles;
            const professionalRole = userResp.find(
              role => role.role === "PROFESSIONAL"
            );
            setLogedUser({
              username: response.data.nickName,
              email: response.data.email,
              roles: userResp.map(role => role.role),
              district: professionalRole ? professionalRole.district : "", // Verifica si el rol existe
              trade: professionalRole ? professionalRole.trade : "", // Verifica si el rol existe
              phoneNumber:
                response.data.phoneNumber == null
                  ? ""
                  : response.data.phoneNumber,
              contactEmail:
                response.data.contactMail == null
                  ? ""
                  : response.data.contactMail,
              role: response.data.currentRolDto,
            });
          })
          .catch(error => {
            setModalMessage(error.response.data.error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(error => {
        setModalMessage(error.response.data.error);
      });
  }, [params.email]);

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
        setLogedUser(prevUser => ({
          ...prevUser,
          role: response.data.currentRolDto,
        }));
        console.log(logedUser);
        setModalMessage("Rol cambiado con éxito.");
      })
      .catch(error => {
        setModalMessage(error.message);
      });
  };

  const handleRequestDescription = () => {
    setIsDescriptionBoxVisible(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackgroundSection />
      <Navbar user={logedUser} />
      <div className="profile-page-container">
        <UserProfile
          comesFromRequest={comesFromRequest}
          logedUser={logedUser}
          profileUser={profileUser}
          setProfileUser={setProfileUser}
          setModalMessage={setModalMessage}
          handleSwitchRole={handleSwitchRole}
          handleRequestDescription={handleRequestDescription}
        />
        <CommentSection
          logedUserEmail={logedUser.email}
          profileUserEmail={profileUser.email}
          setModalMessage={setModalMessage}
        />
        <RequestDescriptionBox
          logedUserEmail={logedUser.email}
          logedUserRole={logedUser.role}
          profileUser={profileUser}
          setModalMessage={setModalMessage}
        />
      </div>
      {modalMessage && (
        <Modal message={modalMessage} setModalMessage={setModalMessage} />
      )}
    </>
  );
};
export default Profile;
