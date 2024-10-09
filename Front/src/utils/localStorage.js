export const setTokenToLocalStorage = token => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const setUserRoleToLocalStorage = role => {
  localStorage.setItem("role", role);
};

export const getUserRoleFromLocalStorage = () => {
  return localStorage.getItem("role");
};

export const setUserEmailToLocalStorage = email => {
  localStorage.setItem("email", email);
};

export const getUserEmailFromLocalStorage = () => {
  return localStorage.getItem("email");
};

export const removeItemsFromLocalStorage = () => {
  localStorage.clear();
};
