import React, { useState } from "react";
import "./requestInfoCard.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const RequestInfoCard = ({ request }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="request-body">
      <div className="request-info-line">
        <Link to={`/profile/${request.user.email}/${true}`}>
          <div className="request-nickname">
          {request.user.nickname}
          </div>
        </Link>
        <div className="request-info-title">
          "{request.title}"
        </div>
        <button onClick={toggleDescription} className="description-toggle">
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </button>
        <div className="request-buttons">
          <Button> 
            <div  className="accept-btn"> 
            Aceptar
            </div>
          </Button>
          <Button > 
            <div className="reject-btn"> 
            Rechazar
            </div>
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


// return (
//   <div className="request-info-">
//       <Link to={`/profile/${request.user.email}`}>{request.user.nickname}</Link>
//     <div className="request-info-title">{request.title}
//       <div className="request-info-description">{request.description}</div>
//     </div>
//     <div className="request-button-column">
//       <Button>Aceptar</Button>
//       <Button>Rechazar</Button>
//     </div>
//   </div>
// );