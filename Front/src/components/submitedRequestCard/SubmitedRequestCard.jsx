import { useState } from "react";
import { Link } from "react-router-dom";
import "./SubmitedRequestCard.css";
import { Icon } from "@iconify/react";
import api from "../../services/api.js";

const SubmitedRequestCard = ({ request }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);  // Nuevo estado para la animación

  const handleDescriptionVisible = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const handleDeleteRequest = () => {
    setIsDeleting(true); // Inicia la animación de eliminación
    setTimeout(() => {
      api
        .deleteRequest(request.id)
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
          setIsDeleting(false); // Si hay un error, detenemos la animación
        });
    }, 1000); // Esperamos 1 segundo para la animación antes de proceder
  };

  return (
    <div className={`submited-request-card-container ${isDeleting ? 'deleting' : ''}`}>
      <div className="submited-request-card-info">
        <div className="submited-request-card-title">{request.title}</div>
        <div className="status-container">
          {request.status === "RECHAZADA" && (
            <div onClick={handleDeleteRequest} className="delete-icon">
              <Icon className="trash-icon" icon="tabler:trash" />
            </div>
          )}
          <div className={`${request.status} status`}>{request.status}</div>
        </div>
      </div>
      <div className="submited-request-card-user-info">
        <Link to={`/profile/${request.profEmail}/${false}`}>
          <div>{request.profNickName}</div>
        </Link>
        <div>{request.profTrade}</div>
      </div>
      <div className="submited-request-card-description">
        <button
          className="submited-request-card-description-button"
          onClick={handleDescriptionVisible}
        >
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </button>
        {isDescriptionVisible && (
          <div className="submited-request-card-description-text">
            {request.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitedRequestCard;
