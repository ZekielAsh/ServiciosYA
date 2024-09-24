import { Navigate } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  getUserRoleFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/localStorage";

const ProtectedRoute = ({ element }) => {
  const token = getTokenFromLocalStorage();
  const role = getUserRoleFromLocalStorage();
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  if (role == "PROFESSIONAL") {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;

export const handleLogOut = () => {
  removeTokenFromLocalStorage();
  window.location.reload();
}