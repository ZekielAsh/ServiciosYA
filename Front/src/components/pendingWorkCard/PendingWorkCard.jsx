import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./PendingWorkCard.css";

const PendingWork = ({ request, setModalMessage, handleRemoveRequest }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleDescriptionVisible = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const handleFinishRequest = () => {
    handleRemoveRequest(request.id);
    // api
    //   .deleteRequest(request.id)
    //   .then(() => {
    //     setModalMessage("Trabajo finalizado");
    //     handleRemoveRequest(request.id);
    //   })
    //   .catch(error => {
    //     setModalMessage(error.response.data.error);
    //   });
  };

  return (
    <div className="pending-work-card-container">
      <div className="pending-work-card-info">
        <div className="pending-work-card-title">{request.title}</div>
        <button
          onClick={handleFinishRequest}
          className="pending-work-card-finish-button"
        >
          Finalizar
        </button>
      </div>
      <Link to={`/profile/${request.user.email}/${false}`}>
        <div>{request.user.nickname}</div>
      </Link>
      <div>
        <button
          className="pending-work-card-description-button"
          onClick={handleDescriptionVisible}
        >
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </button>
        {isDescriptionVisible && <div>{request.description}</div>}
      </div>
    </div>
  );
};

export default PendingWork;
