// userDTO es el response.data de la petición.
const convertFromUserDTOtoUser = userDTO => {
  const userResp = userDTO.userRoles;
  const professionalRole = userResp.find(role => role.role === "PROFESSIONAL");
  return {
    username: userDTO.nickName,
    email: userDTO.email,
    roles: userResp.map(role => role.role),
    district: professionalRole ? professionalRole.district : "",
    trade: professionalRole ? professionalRole.trade : "",
    phoneNumber: userDTO.phoneNumber == null ? "" : userDTO.phoneNumber,
    contactEmail: userDTO.contactMail == null ? "" : userDTO.contactMail,
    role: userDTO.currentRolDto,
  };
};

const arrayDistrictsToOneObject = arrayObject => {
  // para que sea mas facil de usar en el front.
  return arrayObject.reduce((acc, obj) => {
    acc[obj.zone] = obj.neighborhoods;
    return acc;
  }, {});
};

export { convertFromUserDTOtoUser, arrayDistrictsToOneObject };
