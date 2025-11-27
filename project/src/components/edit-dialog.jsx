import React, { useState } from "react";
import "../css/AddDialog.css";


const EditDialog = (props) => {
    const movie = props.movie || {};
    const movieId = movie.id;
    const movieTitle = movie.name || movie.title || "";
    const movieDescription = movie.description || "";
    const movieImg = movie.img || "";

    const [inputs, setInputs] = useState({
        name: movieTitle,
        description: movieDescription,
        img: ""
    });
    
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getImagePreviewUrl = () => {
        if (movieImg) {
            if (movieImg.startsWith('http') || movieImg.startsWith('data:')) {
                return movieImg;
            }
            return `https://movie-backend-t7h7.onrender.com${movieImg}`;
        }
        return "";
    };

    const [prevSrc, setPrevSrc] = useState(getImagePreviewUrl());

    const validateForm = () => {
        const newErrors = {};
        
        if (!inputs.name || inputs.name.trim() === "") {
            newErrors.name = "Title is required";
        } else if (inputs.name.length < 1) {
            newErrors.name = "Title must be at least 1 character";
        } else if (inputs.name.length > 200) {
            newErrors.name = "Title must be no more than 200 characters";
        }
        
        if (!inputs.description || inputs.description.trim() === "") {
            newErrors.description = "Description is required";
        } else if (inputs.description.length < 1) {
            newErrors.description = "Description must be at least 1 character";
        } else if (inputs.description.length > 2000) {
            newErrors.description = "Description must be no more than 2000 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const uploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const allowedTypes = /jpeg|jpg|png|gif|webp/i;
            if (!allowedTypes.test(file.type)) {
                setErrors({ ...errors, img: "Only image files are allowed (jpeg, jpg, png, gif, webp)" });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, img: "Image size must be less than 5MB" });
                return;
            }
            setPrevSrc(URL.createObjectURL(file));
            setInputs((values) => ({ ...values, img: file }));
            setErrors({ ...errors, img: "" });
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            setResult("Please fix the validation errors above");
            return;
        }
        
        setIsSubmitting(true);
        setResult("Sending...");

        try {
            const formData = new FormData();
            formData.append("name", inputs.name.trim());
            formData.append("description", inputs.description.trim());
            if (inputs.img && inputs.img instanceof File) {
                formData.append("img", inputs.img);
            }

            const response = await fetch(`https://movie-backend-t7h7.onrender.com/api/movies/${movieId}`, {
                method: "PUT",
                body: formData
            });

            const data = await response.json();

            if (response.status === 200) {
                setResult("Movie updated successfully!");
                if (props.onUpdate) {
                    props.onUpdate(data);
                }
                setTimeout(() => {
                    if (props.onClose) {
                        props.onClose();
                    }
                }, 1500);
            } else {
                setResult(data.message || data.error || "Error updating movie");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            setResult("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                    <h2>Edit Movie Post</h2>
                    <form id="add-property-form" onSubmit={onSubmit}>
                        <p>
                            <label htmlFor="name">Post Title:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={inputs.name || ""}
                                onChange={handleChange}
                                required
                                minLength={1}
                                maxLength={200}
                            />
                            {errors.name && <span style={{ color: 'red', display: 'block' }}>{errors.name}</span>}
                        </p>
                        <p>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={inputs.description || ""}
                                onChange={handleChange}
                                rows="4"
                                required
                                minLength={1}
                                maxLength={2000}
                            />
                            {errors.description && <span style={{ color: 'red', display: 'block' }}>{errors.description}</span>}
                        </p>

                        <section className="image-upload-section">
                            <div>
                                <p id="img-prev-section">
                                    {prevSrc ? (
                                        <img id="img-prev" src={prevSrc} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </div>
                            <p id="img-upload">
                                <label htmlFor="img">Upload Image (optional):</label>
                                <input 
                                    type="file" 
                                    id="img" 
                                    name="img" 
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" 
                                    onChange={uploadImage} 
                                />
                                {errors.img && <span style={{ color: 'red', display: 'block' }}>{errors.img}</span>}
                            </p>
                        </section>

                        <p>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Movie"}
                            </button>
                        </p>
                        <p style={{ color: result.includes("successfully") ? 'green' : result.includes("Error") || result.includes("error") ? 'red' : 'black' }}>
                            {result}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDialog;

