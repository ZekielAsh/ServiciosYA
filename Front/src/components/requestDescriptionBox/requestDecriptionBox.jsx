import { useState } from "react";
import api from "../../services/api";
import "./requestDescriptionBox.css";

const RequestDescriptionBox = ({
  logedUserEmail,
  logedUserRole,
  profileUser,
  setModalMessage,
}) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const isProfileOwner = logedUserEmail === profileUser.email;
  const isProfessional = profileUser.roles.length >= 2;

  // console.log(isProfileOwner || profileUser.role === "CLIENT" || logedUserRole === "PROFESSIONAL")

  const handleRequestDescription = () => {
    setIsInputVisible(true);
  };

  const handleCloseInput = () => {
    setIsInputVisible(false);
    setTitle("");
    setDescription("");
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    api
      .addRequest(title, description, logedUserEmail, profileUser.email)
      .then(() => {
        setModalMessage("La solicitud ha sido enviada");
      })
      .catch(error => {
        setModalMessage(error.response.data.error);
      });
    handleCloseInput();
  };

  return (
    <div>
      {isProfileOwner || !isProfessional || logedUserRole === "PROFESSIONAL" ?(
        null
      ) : (
        isInputVisible ? (
         <div className="solicitar-input">
           <div className='solicitar-label'>Titulo</div>
           <textarea 
             value={title}
             onChange={handleTitleChange}
             placeholder="   Escribe el título aquí"
           />
           <div className='solicitar-label'>Descripción</div>
           <textarea 
             value={description}
             onChange={handleDescriptionChange}
             placeholder="   Escribe la descripcion aquí"
           />
           <div className='buttons'>
            <button className='button-accept' onClick={handleSubmit}>Enviar</button>
            <button className='button-reject' onClick={handleCloseInput}>Cancelar</button>
           </div>
         </div>
       ) : (
         <button className="button-solicitar" onClick={handleRequestDescription}>Solicitar</button>
       )
     )}
   </div>
  );
};

export default RequestDescriptionBox;

// return (
//   <div>
//     {isProfileOwner ? (
//       null
//     ) : (
//       isInputVisible ? (
//         <div className="description-input">
//           <h2>Titulo</h2>
//           <textarea
//             value={title}
//             onChange={handleTitleChange}
//           />
//           <h2>Descripción</h2>
//           <textarea
//             value={description}
//             onChange={handleDescriptionChange}
//           />
//           <button onClick={handleSubmit}>Enviar</button>
//           <button onClick={handleCloseInput}>Cancelar</button>
//         </div>
//       ) : (
//         <button onClick={handleRequestDescription}>Solicitar</button>
//       )
//     )}
//   </div>
// );
