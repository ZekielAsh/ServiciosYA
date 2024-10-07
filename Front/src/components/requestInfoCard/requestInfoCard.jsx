import "./requestInfoCard.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const RequestInfoCard = ({ request }) => {
    console.log(request)
    console.log("aca esta la desc: " + request.description)
    return(
      <div className="request-body">
        <div className="request-info-title">
        <strong> Nombre </strong> 
          <Link to={`/profile/${request.user.email}`}>
          {request.user.nickname}</Link>  
        </div>
        <strong> Descripcion </strong>
           {request.description}
        <div className="request-buttons">
          <div className="request-button-left">
            <Button>Aceptar</Button>
          </div>
          <div className="request-button-right">
            <Button>Rechazar</Button>
          </div>
        </div>
      </div>
    )    
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