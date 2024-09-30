import { useState, useEffect } from "react";
import api from "../../services/api";

const CommentSection = ({ profileUserEmail, setModalMessage }) => {
  const [review, setReview] = useState(""); // Estado para el nuevo comentario
  const [reviews, setReviews] = useState([]); // Estado para la lista de comentarios
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getComments(profileUserEmail)
      .then(response => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch(error => {
        setModalMessage(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleReviewChange = event => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = event => {
    if (event.key === "Enter" && review.trim() !== "") {
      event.preventDefault();
      api
        .addComment({ review, profileUserEmail })
        .then(response => {
          // Agregar la nueva reseña a la lista
          setReviews([...reviews, response.data]);
        })
        .catch(error => {
          // Mostrar error proporcionado por el backend (e.g. reseña vacía, límite de caracteres)
          setModalMessage(error.response.data.error);
        });
      setReview("");
    }
  };

  if (isLoading) {
    return <div>Cargando reseñas...</div>;
  }

  return (
    <div>
      <h2>Reseñas</h2>
      <div>
        {reviews.map((review, key) => (
          <div key={key}>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
      <textarea
        value={review}
        onChange={handleReviewChange}
        onKeyDown={handleReviewSubmit}
        placeholder="Escribe tu reseña y presiona Enter"
      />
    </div>
  );
};

export default CommentSection;
