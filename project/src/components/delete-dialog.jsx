import React, { useState } from "react";
import "../css/AddDialog.css";
import "../css/delete.css";

const DeleteDialog = ({ isOpen, movie = {}, onClose, onDelete }) => {
  const [result, setResult] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const movieId = movie._id || movie.id || "";
  const movieTitle = movie.title || movie.name || "this movie";

  const deleteMovie = async () => {
    if (!movieId) {
      setResult("Missing movie id — cannot delete.");
      return;
    }

    setIsDeleting(true);
    setResult("Deleting...");

    try {
      const response = await fetch(
        `https://movie-backend-t7h7.onrender.com/api/movies/${movieId}`,
        { method: "DELETE" }
      );

      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        data = null;
      }

      if (response.ok) {
        setResult("Movie successfully deleted!");
        if (onDelete) onDelete(movieId);
        setTimeout(() => {
          if (onClose) onClose();
        }, 800);
      } else {
        const serverMsg = (data && (data.message || data.error)) || `Delete failed (${response.status})`;
        console.error("Delete failed:", response.status, serverMsg);
        setResult(serverMsg);
      }
    } catch (error) {
      console.error("Network error deleting movie:", error);
      setResult("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="add-dialog" className="w3-modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span id="dialog-close" className="w3-button w3-display-topright" onClick={onClose}>
            &times;
          </span>
          <h2>Delete Movie Post</h2>
          <div id="delete-content">
            <h3>Are you sure you want to delete "{movieTitle}"?</h3>
            <p>This action cannot be undone.</p>

            <section style={{ marginTop: "20px" }}>
              <button
                onClick={onClose}
                disabled={isDeleting}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>

              <button
                onClick={deleteMovie}
                disabled={isDeleting}
                style={{ backgroundColor: "#d32f2f", color: "white" }}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </section>

            <p
              style={{
                color: result.toLowerCase().includes("success") ? "green" :
                       (result.toLowerCase().includes("error") || result.toLowerCase().includes("fail") || result.toLowerCase().includes("couldn't")) ? "red" : "black",
                marginTop: "10px",
              }}
            >
              {result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
