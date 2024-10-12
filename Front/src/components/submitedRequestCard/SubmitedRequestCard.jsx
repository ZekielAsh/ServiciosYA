import { useState } from "react";
import "./SubmitedRequestCard.css";

const SubmitedRequestCard = ({ request }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleDescriptionVisible = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="submited-request-card-container">
      <div className="submited-request-card-info">
        <div className="submited-request-card-title">{request.title}</div>
        <div className={`${request.status} status`}>{request.status}</div>
      </div>
      <div className="submited-request-card-user-info">
        <div>{request.user.nickname}</div>
        {/* <p>{sentRequest.user.userRoles.trade}</p> */}
      </div>
      <div className="submited-request-card-description">
        <botton
          className="submited-request-card-description-botton"
          onClick={handleDescriptionVisible}
        >
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </botton>
        {isDescriptionVisible && <p>{request.description}</p>}
      </div>
    </div>
  );
};

export default SubmitedRequestCard;
