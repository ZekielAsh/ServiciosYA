import { useEffect, useState } from "react";
import { getUserEmailFromLocalStorage } from "../../utils/localStorage";
import Navbar from "../../components/navbar/Navbar";
import api from "../../services/api.js";
import "./requestsPage.css";
import Spinner from "../../components/spinner/Spinner";
import RequestInfoCard from "../../components/requestInfoCard/requestInfoCard.jsx";
import { div } from "framer-motion/client";

const RequestsPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [Sentrequests, setSentRequests] = useState([]);
  const [recievedRequests, setRecievedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const logedUserEmail = getUserEmailFromLocalStorage();
  const [logedUser, setUser] = useState(null);

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
        setModalMessage(error.respose.data.error);
      }
    };
  
    fetchUserData();
  }, [logedUserEmail]);
  
  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const userResponse = await api.getUserByEmail(logedUserEmail);
        
        if (userResponse.data.currentRolDto.includes('PROFESSIONAL')) {
          const recievedRequestsResponse = await api.getRecievedRequests(logedUserEmail);
          console.log(recievedRequestsResponse.data)
          setRecievedRequests(recievedRequestsResponse.data);
        } else{
          const sentRequestsResponse = await api.getSendRequests(logedUserEmail);
          setSentRequests(sentRequestsResponse.data); 
        }
      } catch (error) {
        setModalMessage(error.respose.data.error);
      }
    };
    fetchSentRequests()
  }, [logedUserEmail]);
  

  if (isLoading) return <Spinner />;
  
  return (
    <>
      <Navbar user={logedUser} />
      {/* Aquí puedes renderizar tus requests */}
      <div>
        {logedUser.role === 'CLIENT' ? (
          Sentrequests.map(sentRequest => (
            <div key={sentRequest.id}>
              <p>{sentRequest.title}</p>
              <p>{sentRequest.description}</p>
              <p>{sentRequest.status}</p>
            </div>
          ))
        ) : (
          <div className="request-info-card-container">
            {recievedRequests.map(receivedRequest => (
              <RequestInfoCard key={receivedRequest.id} request={receivedRequest} />
            ))}
          </div>
        )}
      </div>
    </>
  );
  
};

export default RequestsPage;
