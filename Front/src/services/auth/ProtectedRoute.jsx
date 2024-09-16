import { Navigate } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  getUserRoleFromLocalStorage,
} from "../../utils/localStorage";

const ProtectedRoute = ({ element }) => {
  const token = getTokenFromLocalStorage();
  const role = getUserRoleFromLocalStorage();
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  if (role == "CLIENT") {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
