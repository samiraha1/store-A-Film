import React from "react";
import "../css/Popup.css"

function MovieModal({ movie, isOpen, onClose }) {
    if (!isOpen || !movie) return null;

    const movieTitle = movie.name || movie.title || "Movie";
    const movieDescription = movie.description || "";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <div className="modal-body">
                    {movie.img && (
                        <img
                            src={`https://movie-backend-t7h7.onrender.com${movie.img}`}
                            alt={movieTitle}
                            className="modal-image"
                        />
                    )}
                    <div className="modal-info">
                        <h2>{movieTitle}</h2>
                        {movie.director && <p>Director: {movie.director}</p>}
                        {movie.releaseDate && <p>Release Date: {movie.releaseDate}</p>}
                        {movieDescription && <p>{movieDescription}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;