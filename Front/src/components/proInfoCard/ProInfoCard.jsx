import "./proInfoCard.css";
import { Link } from "react-router-dom";

// objet user tiene nombre y rubro
const proInfoCard = ({ userPro }) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card-item">
        <Link to={`/profile/${userPro.email}/${false}`}>{userPro.nickName}</Link>
      </div>
      <div className="user-info-card-item">{userPro.trade}</div>
      <div className="user-info-card-item">{userPro.district}</div>
    </div>
  );
};

export default proInfoCard;
