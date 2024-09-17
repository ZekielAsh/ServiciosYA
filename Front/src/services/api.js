import axios from "axios";

export const API_URL = "http://localhost:8080";

// ############################## USERS ##############################

// el objeto user tiene que tener las siguientes claves y valor que quieras:
// {userName, password, email}
const login = user =>
  axios.post(`${API_URL}/auth/login`, user).then(response => response);

// el objeto user tiene que tener las siguientes claves y valor que quieras:
// {userName, password, email} falta ver como agregar la imagen con archivo
const register = user =>
  axios.post(`${API_URL}/auth/register`, user).then(response => response);

// el objeto userRegisted tiene que tener las siguientes claves y valor que quieras:
// {email, district, trade}
const registerPro = userRegisted =>
  axios
    .post(`${API_URL}/user/addProfessionalRole`, userRegisted)
    .then(response => response);

const searchProUsers = searchText =>
  axios
    .get(`${API_URL}/user/getByKeyword`, { params: { keyword: searchText } })
    .then(response => response);

const getUserByEmail = email =>
  axios.get(`${API_URL}/user/getByEmail/${email}`).then(response => response);

export default {
  login,
  register,
  registerPro,
  searchProUsers,
  getUserByEmail,
};
