import { useState } from "react";
import api from "../../services/api";

const CommentSection = ({ reviews, setReviews }) => {
  // TODO : Recibir como prop el email del usuario y asi obtener las rewiews de ese usuario.
  //        Agregar los endpoint en la API.
  ////////////////////////////////////////////////////////////
  const [review, setReview] = useState(""); // Estado para el nuevo comentario
  const [reviewError, setReviewError] = useState(""); // Estado para errores de reseña

  const handleReviewChange = event => {
    setReview(event.target.value);
  };

  // Por prop "reviews"
  const renderReviews = () => {
    return reviews.map((review, index) => (
      <div key={index}>
        <p>{review}</p>
      </div>
    ));
  };

  const handleReviewSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Llamar al backend para validar y enviar la reseña
      api
        .submitReview({ review })
        .then(response => {
          // Añadir la nueva reseña a la lista de reseñas
          setReviews([...reviews, response.data.review]);
          setReview(""); // Limpiar el campo de reseña
          setReviewError(""); // Limpiar errores
        })
        .catch(error => {
          // Mostrar error proporcionado por el backend (e.g. reseña vacía, límite de caracteres)
          setReviewError(
            error.response.data.message || "Error al enviar la reseña."
          );
        });
    }
  };

  return (
    <div>
      <h2>Reseñas</h2>
      {renderReviews()}
      <textarea
        value={review}
        onChange={handleReviewChange}
        onKeyDown={handleReviewSubmit}
        placeholder="Escribe tu reseña y presiona Enter"
      />
      {reviewError && <div style={{ color: "red" }}>{reviewError}</div>}
    </div>
  );
};

export default CommentSection;
