export const setTokenToLocalStorage = token => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const setUserRoleToLocalStorage = role => {
  localStorage.setItem("role", role);
};

export const getUserRoleFromLocalStorage = () => {
  return localStorage.getItem("role");
};

const removeUserRoleFromLocalStorage = () => {
  localStorage.removeItem("role");
};

export const cleanLocalStorage = () => {
  removeTokenFromLocalStorage();
  removeUserRoleFromLocalStorage();
};
