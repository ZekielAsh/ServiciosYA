import { useState } from "react";
import { toast } from "react-toastify"; // Importa toast de react-toastify
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
        toast.success("La solicitud ha sido enviada"); // Muestra el mensaje de éxito con toast
      })
      .catch(error => {
        toast.error(error.response.data.error); // Muestra el mensaje de error con toast
      });
    handleCloseInput();
  };

  return (
    <div>
      {isProfileOwner || !isProfessional || logedUserRole === "PROFESSIONAL" ? (
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
