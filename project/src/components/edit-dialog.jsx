import React, { useEffect, useState, useRef } from "react";
import "../css/AddDialog.css";


const EditDialog = ({ isOpen, movie = {}, onClose, onUpdate }) => {
  const movieId = movie._id || movie.id || "";

  const initialTitle = movie.title || "";
  const initialDescription = movie.description || "";
  const initialMainImage = movie.main_image || "";

  const [inputs, setInputs] = useState({
    title: initialTitle,
    description: initialDescription,
    img: null, 
  });

  const [prevSrc, setPrevSrc] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const objectUrlRef = useRef(null);

  const getImagePreviewUrlFromBackend = (mainImagePath) => {
    if (!mainImagePath) return "";
    if (mainImagePath.startsWith("http") || mainImagePath.startsWith("data:")) {
      return mainImagePath;
    }
    if (mainImagePath.startsWith("/")) {
      return `https://movie-backend-t7h7.onrender.com${mainImagePath}`;
    }
    return `https://movie-backend-t7h7.onrender.com/${mainImagePath}`;
  };

  useEffect(() => {
    setInputs({
      title: initialTitle,
      description: initialDescription,
      img: null,
    });
    setErrors({});
    setResult("");
    setPrevSrc(getImagePreviewUrlFromBackend(initialMainImage));
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, [movieId, initialTitle, initialDescription, initialMainImage, isOpen]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const title = (inputs.title || "").trim();
    const description = (inputs.description || "").trim();

    if (!title) {
      newErrors.title = "Title is required";
    } else if (title.length < 1) {
      newErrors.title = "Title must be at least 1 character";
    } else if (title.length > 200) {
      newErrors.title = "Title must be no more than 200 characters";
    }

    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 1) {
      newErrors.description = "Description must be at least 1 character";
    } else if (description.length > 2000) {
      newErrors.description = "Description must be no more than 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prevErr) => ({ ...prevErr, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const allowedTypes = /jpeg|jpg|png|gif|webp/i;
    if (!allowedTypes.test(file.type)) {
      setErrors((prev) => ({ ...prev, img: "Only image files are allowed (jpeg, jpg, png, gif, webp)" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, img: "Image size must be less than 5MB" }));
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPrevSrc(objectUrl);
    setInputs((prev) => ({ ...prev, img: file }));
    setErrors((prev) => ({ ...prev, img: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!movieId) {
      setResult("Missing movie id — cannot update.");
      return;
    }

    if (!validateForm()) {
      setResult("Please fix the validation errors above.");
      return;
    }

    setIsSubmitting(true);
    setResult("Sending...");

    try {
      const formData = new FormData();
      formData.append("title", (inputs.title || "").trim());
      formData.append("description", (inputs.description || "").trim());
      if (inputs.img instanceof File) {
        formData.append("img", inputs.img);
      }

      const response = await fetch(
        `https://movie-backend-t7h7.onrender.com/api/movies/${movieId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      let data = null;
      try {
        data = await response.json();
      } catch (err) {
      }

      if (response.ok) {
        setResult("Movie updated successfully!");
        if (onUpdate) onUpdate(data || {});
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } else {
        const serverMessage = (data && (data.message || data.error)) || `Error updating movie (${response.status})`;
        setResult(serverMessage);
      }
    } catch (err) {
      console.error("Update error", err);
      setResult("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
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

          <h2>Edit Movie Post</h2>

          <form id="add-property-form" onSubmit={onSubmit} encType="multipart/form-data">
            <p>
              <label htmlFor="title">Post Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title || ""}
                onChange={handleChange}
                required
                minLength={1}
                maxLength={200}
              />
              {errors.title && <div style={{ color: "red", marginTop: 6 }}>{errors.title}</div>}
            </p>

            <p>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={inputs.description || ""}
                onChange={handleChange}
                rows="5"
                required
                minLength={1}
                maxLength={2000}
              />
              {errors.description && <div style={{ color: "red", marginTop: 6 }}>{errors.description}</div>}
            </p>

            <section className="image-upload-section">
              <div>
                <p id="img-prev-section">
                  {prevSrc ? (
                    <img
                      id="img-prev"
                      src={prevSrc}
                      alt="Preview"
                      style={{ maxWidth: 200, maxHeight: 200, display: "block" }}
                    />
                  ) : (
                    <em style={{ color: "#666" }}>No image</em>
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
                  onChange={handleImageChange}
                />
                {errors.img && <div style={{ color: "red", marginTop: 6 }}>{errors.img}</div>}
              </p>
            </section>

            <p>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Movie"}
              </button>
            </p>

            <p style={{ color: result.toLowerCase().includes("success") ? "green" : result.toLowerCase().includes("error") ? "red" : "black" }}>
              {result}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;

