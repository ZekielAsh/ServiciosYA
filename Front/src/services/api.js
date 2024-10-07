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
const addComment = (textComment, userEmail) =>
  axios
    .post(
      `${API_URL}/comments/addComment?comment=${textComment}&email=${userEmail}`
    )
    .then(response => response);

// FALTA AGREGAR EL ENDPOINT PARA OBTENER LAS REVIEWS DE UN USUARIO

/* ############################## SERVICE REQUEST ############################## */

const addRequest = (title, description, email, professionalEmail) =>{
  const requestData = {title, description}
  return axios
  .post(
    `${API_URL}/requests/sendRequest?email=${email}&professionalEmail=${professionalEmail}`, requestData
  )
  .then(response => response);
}

const getSendRequests = (email) =>{
  return axios
  .get(
    `${API_URL}/requests/sent/profile/${email}`
  )
  .then(response => response);
}

const getRecievedRequests = (email) =>{
  return axios
  .get(
    `${API_URL}received/profile/${email}`
  )
  .then(response => response);
}

export default {
  getUserByEmail,
  searchProUsers,
  addMailContact,
  getAllTrades,
  getComments,
  registerPro,
  changeRole,
  addComment,
  addRequest,
  getSendRequests,
  getRecievedRequests,
  addPhone,
  register,
  login,
};
