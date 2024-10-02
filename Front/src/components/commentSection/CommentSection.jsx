import { useState, useEffect } from "react";
import api from "../../services/api";
import "./CommentSection.css";

const CommentSection = ({ profileUserEmail, setModalMessage }) => {
  const [review, setReview] = useState(""); // Estado para el nuevo comentario
  const [reviews, setReviews] = useState([]); // Estado para la lista de comentarios
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getComments(profileUserEmail)
      .then(response => {
        console.log("getcomments", response.data);
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
    <div className="comment-section">
      <h2>Reseñas</h2>
      <textarea
        className="comment-section-review-input"
        value={review}
        onChange={handleReviewChange}
        onKeyDown={handleReviewSubmit}
        placeholder="Escribe tu reseña y presiona Enter"
      />
      <div className="comment-section-reviews">
        {reviews.map((review, key) => (
          <div className="comment-section-review" key={key}>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
