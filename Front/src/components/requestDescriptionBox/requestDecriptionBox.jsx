import React, { useState } from 'react';
import api from "../../services/api";

const RequestDescriptionBox = ({ logedUserEmail, profileUserEmail, setModalMessage}) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const isProfileOwner = logedUserEmail === profileUserEmail;

  const handleRequestDescription = () => {
    setIsInputVisible(true);
  };

  const handleCloseInput = () => {
    setIsInputVisible(false);
    setTitle('');
    setDescription('');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) =>{
    setTitle(event.target.value)
  };

  const handleSubmit = () => { 
    api.addRequest(title, description, logedUserEmail, profileUserEmail)
    .then(response => {
      setModalMessage("La solicitud ha sido enviada");
    })
    .catch(error => {
      setModalMessage(error.response.data.error)
      
    })
    handleCloseInput();
  };

  return (
    <div>
      {isProfileOwner ? (
        null
      ) : (
        isInputVisible ? (
          <div className="description-input">
            <h2>Titulo</h2>
            <textarea 
              value={title}
              onChange={handleTitleChange}
            />
            <h2>Descripción</h2>
            <textarea 
              value={description}
              onChange={handleDescriptionChange}
            />
            <button onClick={handleSubmit}>Enviar</button>
            <button onClick={handleCloseInput}>Cancelar</button>
          </div>
        ) : (
          <button onClick={handleRequestDescription}>Solicitar</button>
        )
      )}
    </div>
  );
  
};

export default RequestDescriptionBox;

