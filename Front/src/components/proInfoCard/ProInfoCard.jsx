import "./proInfoCard.css";
import { Link } from "react-router-dom";

// Objeto userPro tiene nombre, rubro y distrito
const ProInfoCard = ({ userPro }) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card-item">
        <Link to={`/profile/${userPro.email}/${false}`} className="user-link">
          {userPro.nickName}
        </Link>
      </div>
      <div className="user-info-card-item">{userPro.trade}</div>
      <div className="user-info-card-item">{userPro.district}</div>
    </div>
  );
};

export default ProInfoCard;
