import React, { useState } from "react";
import EditDialog from "./edit-dialog";
import DeleteDialog from "./delete-dialog";
import "../css/Popup.css"


function BlogModal({ movie, isOpen, onClose, onUpdate, onDelete }) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    if (!isOpen || !movie) return null;

    const movieTitle = movie.name || movie.title || "Movie";
    const movieDescription = movie.description || "";

    const getImageSrc = () => {
        if (!movie.img) return null;
        if (movie.img.startsWith('http') || movie.img.startsWith('data:')) {
            return movie.img;
        }
        return `https://movie-backend-t7h7.onrender.com${movie.img}`;
    };

    const imageSrc = getImageSrc();

    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowEditDialog(true);
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteDialog(true);
    };

    const handleEditClose = () => {
        setShowEditDialog(false);
    };

    const handleDeleteClose = () => {
        setShowDeleteDialog(false);
    };

    const handleEditUpdate = (updatedMovie) => {
        if (onUpdate) {
            onUpdate(updatedMovie);
        }
        setShowEditDialog(false);
    };

    const handleDeleteConfirm = (movieId) => {
        if (onDelete) {
            onDelete(movieId);
        }
        setShowDeleteDialog(false);
        onClose(); 
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                    <div className="modal-body">
                        <div className="edit" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', padding: '10px' }}>
                            <a 
                                href="#" 
                                onClick={handleEditClick}
                                style={{ fontSize: '20px', textDecoration: 'none', color: '#63F2D8' }}
                                title="Edit"
                            >
                                &#9998;
                            </a>
                            <a 
                                href="#" 
                                onClick={handleDeleteClick}
                                style={{ fontSize: '20px', textDecoration: 'none', color: '#d32f2f' }}
                                title="Delete"
                            >
                                &#x2715;
                            </a>
                        </div>
                        {imageSrc && (
                            <img
                                src={imageSrc}
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

            <EditDialog
                isOpen={showEditDialog}
                movie={movie}
                onClose={handleEditClose}
                onUpdate={handleEditUpdate}
            />

            <DeleteDialog
                isOpen={showDeleteDialog}
                movie={movie}
                onClose={handleDeleteClose}
                onDelete={handleDeleteConfirm}
            />
        </>
    );
}

export default BlogModal;