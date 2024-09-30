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

const getUserByEmail = userEmail =>
  axios
    .get(`${API_URL}/user/getByEmail`, { params: { email: userEmail } })
    .then(response => response);

const getAllTrades = () =>
  axios.get(`${API_URL}/trades/getAllTrades`).then(response => response);

const changeRole = (userEmail) =>
  axios
    .post(`${API_URL}/user/changeRole?email=${userEmail}`)  // Enviar el email como parámetro en la URL
    .then(response => response);

const addPhone = (email, phone) =>
  axios
    .post(`${API_URL}/user/addPhone?email=${email}&phone=${phone}`)
    .then(response => response);
  
const addMailContact = (userEmail, emailContact) =>
  console.log(userEmail, emailContact); 
  axios
    .post(`${API_URL}/user/addMailContact?email=${userEmail}&emailContact=${emailContact}`)
    .then(response => response);

const addComment = (comment, userEmail) =>
  axios
    .post(`${API_URL}/comments/addComment`, { comment, userEmail })
    .then(response => response);

export default {
  login,
  register,
  registerPro,
  searchProUsers,
  getUserByEmail,
  getAllTrades,
  changeRole,
  addPhone,
  addMailContact,
  addComment
};
