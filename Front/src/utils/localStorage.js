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

// con usar localStorage.clear() se limpia todo el localStorage
