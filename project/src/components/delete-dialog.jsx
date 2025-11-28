import React, { useState } from "react";
import "../css/AddDialog.css";
import "../css/delete.css"

const DeleteDialog = (props) => {
    const [result, setResult] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const movie = props.movie || {};
    const movieId = movie.id;
    const movieTitle = movie.name || movie.title || "this movie";

    const deleteMovie = async () => {
        setIsDeleting(true);
        setResult("Deleting...");

        try {
            const response = await fetch(`https://movie-backend-t7h7.onrender.com/api/movies/${movieId}`, {
                method: "DELETE"
            });

            if (response.status === 200) {
                setResult("Movie successfully deleted!");
                if (props.onDelete) {
                    props.onDelete(movieId);
                }
                setTimeout(() => {
                    if (props.onClose) {
                        props.onClose();
                    }
                }, 1500);
            } else {
                const data = await response.json().catch(() => ({}));
                setResult(data.message || data.error || "Sorry, we couldn't delete the movie");
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
            setResult("Network error. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!props.isOpen) return null;

    return (
        <div id="add-dialog" className="w3-modal" style={{ display: props.isOpen ? 'block' : 'none' }}>
            <div className="w3-modal-content">
                <div className="w3-container">
                    <span
                        id="dialog-close"
                        className="w3-button w3-display-topright"
                        onClick={props.onClose}
                    >
                        &times;
                    </span>
                    <h2>Delete Movie Post</h2>
                    <div id="delete-content">
                        <h3>Are you sure you want to delete "{movieTitle}"?</h3>
                        <p>This action cannot be undone.</p>
                        <section style={{ marginTop: '20px' }}>
                            <button 
                                onClick={props.onClose} 
                                disabled={isDeleting}
                                style={{ marginRight: '10px' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={deleteMovie} 
                                disabled={isDeleting}
                                style={{ backgroundColor: '#d32f2f', color: 'white' }}
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </section>
                        <p style={{ 
                            color: result.includes("successfully") ? 'green' : result.includes("Error") || result.includes("error") || result.includes("couldn't") ? 'red' : 'black',
                            marginTop: '10px'
                        }}>
                            {result}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
