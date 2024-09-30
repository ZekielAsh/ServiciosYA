import axios from "axios";

export const API_URL = "http://localhost:8080";

/* ############################## USERS ############################## */

const login = user =>
  axios.post(`${API_URL}/auth/login`, user).then(response => response);

const register = user =>
  axios.post(`${API_URL}/auth/register`, user).then(response => response);

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

// CAMBIAR NOMBRE A changeUserRole?
// TA MAL
const changeRole = userEmail =>
  axios
    .post(`${API_URL}/user/changeRole?email=${userEmail}`) // Enviar el email como parámetro en la URL
    .then(response => response);

/* ############################## TRADES ############################## */

const getAllTrades = () =>
  axios.get(`${API_URL}/trades/getAllTrades`).then(response => response);

/* ############################## CONTACT INFO ############################## */

const addPhone = (email, phone) =>
  axios
    .post(`${API_URL}/user/addPhone?email=${email}&phone=${phone}`)
    .then(response => response);

const addMailContact = (userEmail, emailContact) =>
  axios
    .post(
      `${API_URL}/user/addMailContact?email=${userEmail}&emailContact=${emailContact}`
    )
    .then(response => response);

/* ############################## COMMENTS ############################## */

const getComments = userEmail =>
  axios
    .get(`${API_URL}/comments/profile/${userEmail}`)
    .then(response => response);

// PEDIR AL BACK QUE SOLO SE PASE EL STRING DEL COMENTARIO
const addComment = (commentDto, userEmail) =>
  axios
    .post(`${API_URL}/comments/addComment`, commentDto, {
      params: { email: userEmail },
    })
    .then(response => response);

// FALTA AGREGAR EL ENDPOINT PARA OBTENER LAS REVIEWS DE UN USUARIO

export default {
  getUserByEmail,
  searchProUsers,
  addMailContact,
  getAllTrades,
  getComments,
  registerPro,
  changeRole,
  addComment,
  addPhone,
  register,
  login,
};
