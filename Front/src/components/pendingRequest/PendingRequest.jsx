import { useState } from "react";
import { Link } from "react-router-dom";
import "./PendingRequest.css";

const PendingRequest = ({ request }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleDescriptionVisible = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="pending-request-card-container">
      <div className="pending-request-card-title">{request.title}</div>
      <Link to={`/profile/${request.user.email}/${false}`}>
        <div>{request.user.nickName}</div>
      </Link>
      <div className="pending-request-card-description">
        <button
          className="pending-request-card-description-botton"
          onClick={handleDescriptionVisible}
        >
          {isDescriptionVisible ? "Ocultar Descripción" : "Ver Descripción"}
        </button>
        {isDescriptionVisible && (
          <div className="pending-request-card-description-text">
            {request.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequest;
