import { getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { useEffect, useState } from "react";
import SubmitedRequestCard from "../../components/submitedRequestCard/SubmitedRequestCard";
import BackgroundSection from "../../components/backgroundSection/BackgroundSection";
import RequestInfoCard from "../../components/requestInfoCard/requestInfoCard.jsx";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import api from "../../services/api.js";
import "./requestsPage.css";

const RequestsPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [recievedRequests, setRecievedRequests] = useState([]);
  const [Sentrequests, setSentRequests] = useState([]);

  const [logedUser, setUser] = useState(null);
  const logedUserEmail = getUserEmailFromLocalStorage();

  const handleRemoveRequest = requestId => {
    setRecievedRequests(prevRequests =>
      prevRequests.filter(request => request.id !== requestId)
    );
  };

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

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const userResponse = await api.getUserByEmail(logedUserEmail);

        if (userResponse.data.currentRolDto.includes("PROFESSIONAL")) {
          const recievedRequestsResponse =
            await api.getRecievedRequestsByStatus(logedUserEmail, "PENDIENTE");
          setRecievedRequests(recievedRequestsResponse.data);
        } else {
          const sentRequestsResponse = await api.getSendRequests(
            logedUserEmail
          );
          setSentRequests(sentRequestsResponse.data);
        }
      } catch (error) {
        // CREO QUE NO TRAE ERROR
        console.log(error);
        setModalMessage(error.response.data.error);
      }
    };
    fetchSentRequests();
  }, [logedUserEmail]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackgroundSection />
      <Navbar user={logedUser} />
      {logedUser.role === "CLIENT" ? (
        Sentrequests.length !== 0 ? (
          <div className="request-info-card-container">
            {Sentrequests.map(sentRequest => (
              <SubmitedRequestCard request={sentRequest} key={sentRequest.id} />
            ))}
          </div>
        ) : (
          <div className="requests-page-text">
            Aún no tienes solicitudes enviadas
          </div>
        )
      ) : logedUser.role === "PROFESSIONAL" ? (
        recievedRequests.length !== 0 ? (
          <div className="request-info-card-container">
            {recievedRequests.map(receivedRequest => (
              <RequestInfoCard
                key={receivedRequest.id}
                request={receivedRequest}
                handleRemoveRequest={handleRemoveRequest}
                setModalMessage={setModalMessage}
              />
            ))}
          </div>
        ) : (
          <div className="requests-page-text">
            Aún no te han enviado solicitudes
          </div>
        )
      ) : null}
      {modalMessage && (
        <Modal message={modalMessage} setModalMessage={setModalMessage} />
      )}
    </>
  );  
};

export default RequestsPage;
