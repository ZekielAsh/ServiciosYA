import { getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/commentSection/CommentSection";
import UserProfile from "../../components/userProfile/UserProfile";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api";

const Profile = () => {
  // MODIFICAR EL AUTHPATH YA QUE NECESITAS ESTAR LOGEADO
  const params = useParams();
  // POR AHORA EL USER ES EL USUARIO DEL PERFIL QUE ESTAMOS VIENDO
  const [logedUser, setLogedUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const userProfileEmail = params.email;
    const logedUserEmail = getUserEmailFromLocalStorage();

    api
      .getUserByEmail(userProfileEmail)
      .then(response => {
        const userResp = response.data.userRoles;
        const professionalRole = userResp.find(
          role => role.role === "PROFESSIONAL"
        );
        console.log(response.data);
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
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar user={logedUser} />
      <UserProfile
        logedUser={logedUser}
        profileUser={profileUser}
        setProfileUser={setProfileUser}
        setModalMessage={setModalMessage}
      />
      <CommentSection
        profileUserEmail={profileUser.email}
        setModalMessage={setModalMessage}
      />
      {modalMessage && (
        <Modal message={modalMessage} setModalMessage={setModalMessage} />
      )}
    </>
  );
};
export default Profile;
