import {
  getTokenFromLocalStorage,
  getUserRoleFromLocalStorage,
} from "../../utils/localStorage";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = getTokenFromLocalStorage();
  const role = getUserRoleFromLocalStorage();
  if (token === null) {
    return <Navigate to="/login" replace />;
  }
  /*if (role == "PROFESSIONAL" || role == "CLIENT") {
    return <Navigate to="/" replace />;
  }*/
  return element;
};

export default ProtectedRoute;
