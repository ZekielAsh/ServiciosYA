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
  const [logedUser, setUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const [reviews, setReviews] = useState([]); // Estado para las reseñas existentes

  useEffect(() => {
    const userProfileEmail = params.email;
    const logedUserEmail = getUserEmailFromLocalStorage();

    api.getUserByEmail(userProfileEmail).then(response => {
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
        role: response.data.currentRolDto,
      });
      api
        .getUserByEmail(logedUserEmail)
        .then(response => {
          const userResp = response.data.userRoles;
          const professionalRole = userResp.find(
            role => role.role === "PROFESSIONAL"
          );
          setUser({
            username: response.data.nickName,
            email: response.data.email,
            roles: userResp.map(role => role.role),
            district: professionalRole ? professionalRole.district : "", // Verifica si el rol existe
            trade: professionalRole ? professionalRole.trade : "", // Verifica si el rol existe
            role: response.data.currentRolDto,
          });
        })
        .catch(error => {
          setModalMessage(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, []);

  // PARA PROBAR, CASI LISTO. FALTA CAMBIAR EL UserDto DEL BACK
  ////////////////////////////////////////////////////////////////////////
  const handleSwitchRole = () => {
    api
      .changeRole(logedUser.email)
      .then(response => {
        setUser(response.data);
        setModalMessage("Rol cambiado con éxito.");
      })
      .catch(error => {
        setModalMessage(error.message);
      });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Navbar user={logedUser} />
      <UserProfile
        user={profileUser}
        setModalMessage={setModalMessage}
        handleSwitchRole={handleSwitchRole}
      />
      <CommentSection reviews={reviews} setReviews={setReviews} />
      {modalMessage && (
        <Modal message={modalMessage} setModalMessage={setModalMessage} />
      )}
    </>
  );
};
export default Profile;
