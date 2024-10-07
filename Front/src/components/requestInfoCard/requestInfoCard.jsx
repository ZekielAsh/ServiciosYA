import "./requestInfoCard.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const RequestInfoCard = ({ request }) => {
    console.log(request.user)
  return (
    <div className="request-info-card">
      <div className="request-info-card-item">
        <Link to={`/profile/${request.user.email}`}>{request.user.nickname}</Link>
      </div>
      <div className="request-info-card-item">{request.title}</div>
      <div className="request-info-card-item">{request.description}</div>
      <div className="request-info-card-item"><Button>Aceptar</Button></div>
      <div className="request-info-card-item"><Button>Rechazar</Button></div>
    </div>
  );
};
export default RequestInfoCard;
