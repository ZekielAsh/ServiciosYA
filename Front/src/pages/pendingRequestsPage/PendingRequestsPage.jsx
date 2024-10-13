import { getUserEmailFromLocalStorage } from "../../utils/localStorage.js";
import { useState, useEffect } from "react";
import BackgroundSection from "../../components/backgroundSection/BackgroundSection.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Modal from "../../components/modal/Modal.jsx";
import api from "../../services/api.js";

const PendingRequestsPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [logedUser, setUser] = useState(null);
  const logedUserEmail = getUserEmailFromLocalStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.getUserByEmail(logedUserEmail);
        const userResp = userResponse.data.userRoles;
        setUser({
          username: userResponse.data.nickName,
          email: userResponse.data.email,
          roles: userResp.map(role => role.role),
          district: userResp.district,
          trade: userResp.trade,
          role: userResponse.data.currentRolDto,
          phone: userResponse.data.phoneNumber || "",
          contactEmail: userResponse.data.contactMail || "",
        });
        setIsLoading(false);
      } catch (error) {
        setModalMessage(error.response.data.error);
      }
    };

    fetchUserData();
  }, [logedUserEmail]);

  //////////////////////////////////////////////////////////////////////
  //MANERA DE TRAER SOLICITUDES DE TRABAJO PENDIENTES DEL PROFESSIONAL//
  //////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <BackgroundSection />
      <Navbar user={logedUser} />
      {modalMessage && (
        <Modal message={modalMessage} setModalMessage={setModalMessage} />
      )}
    </div>
  );
};

export default PendingRequestsPage;
