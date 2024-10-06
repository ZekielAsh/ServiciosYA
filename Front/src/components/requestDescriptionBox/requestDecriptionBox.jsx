import React, { useState } from 'react';

const RequestDescriptionBox = ({ logedUserEmail, profileUserEmail }) => {
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
    // Aquí podrías manejar lo que quieres hacer con la descripción
    console.log(description);
    handleCloseInput(); // Resetea y cierra el cuadro de texto al enviar
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

