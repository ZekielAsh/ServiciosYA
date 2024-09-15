import axios from "axios";

export const API_URL = "http://localhost:7070";

// ############################## USERS ##############################

// el objeto user tiene que tener la siguiente forma:
// {email, contraseña}
const login = user =>
  axios.post(`${API_URL}/login`, user).then(response => response);

// el objeto user tiene que tener la siguiente forma:
// {nombre, email, contraseña, DNI} falta ver como agregar la imagen con archivo
const register = user =>
  axios.post(`${API_URL}/register`, user).then(response => response);

export default {
  login,
  register,
};
