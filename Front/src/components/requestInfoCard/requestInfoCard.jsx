import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Button from "../button/Button";
import "./requestInfoCard.css";

const RequestInfoCard = ({ request, handleRemoveRequest }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const handleUpdateRequestStatus = status => {
    api
      .updateRequestStatus(request.id, status)
      .then(() => {
        if (status === "RECHAZADA") {
          toast.success("Solicitud rechazada exitosamente");
        } else {
          toast.success("Solicitud aceptada exitosamente");
        }
        handleRemoveRequest(request.id);
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="request-body">
      <div className="request-info-line">
        <Link to={`/profile/${request.user.email}/${true}`}>
          <div className="request-nickname">{request.user.nickname}</div>
        </Link>
        <div className="request-info-title">{request.title}</div>
        <button onClick={toggleDescription} className="description-toggle">
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </button>
        <div className="request-buttons">
          <Button onClick={() => handleUpdateRequestStatus("ACEPTADA")}>
            <div className="accept-btn">Aceptar</div>
          </Button>
          <Button onClick={() => handleUpdateRequestStatus("RECHAZADA")}>
            <div className="reject-btn">Rechazar</div>
          </Button>
        </div>
      </div>
      {isDescriptionVisible && (
        <div className="request-info-description">
          <strong>Descripción:</strong> {request.description}
        </div>
      )}
    </div>
  );
};

export default RequestInfoCard;
