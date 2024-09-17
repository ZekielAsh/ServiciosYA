import "./proInfoCard.css";

// objet user tiene nombre y rubro
const proInfoCard = ({ userPro }) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card-item">{userPro.nickName}</div>
      {/* <div className="user-info-card-item">{userPro.trade}</div> */}
    </div>
  );
};

export default proInfoCard;
