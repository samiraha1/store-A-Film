import React, { useEffect, useState, useRef } from "react";
import "../css/AddDialog.css";

const EditDialog = ({ isOpen, movie = {}, onClose, onUpdate }) => {
  // Accept both _id or id from backend
  const movieId = movie._id || movie.id || "";

  // Extract fields from the incoming movie object
  const initialTitle = movie.title || "";
  const initialDescription = movie.description || "";
  const initialMainImage = movie.main_image || "";

  const [inputs, setInputs] = useState({
    title: initialTitle,
    description: initialDescription,
    img: null, // File object when a new image is chosen
  });

  const [prevSrc, setPrevSrc] = useState(""); // preview URL (existing or object URL)
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep a ref to the object URL so we can revoke it on cleanup
  const objectUrlRef = useRef(null);

  // Build full preview URL for existing main_image from backend
  const getImagePreviewUrlFromBackend = (mainImagePath) => {
    if (!mainImagePath) return "";
    if (mainImagePath.startsWith("http") || mainImagePath.startsWith("data:")) {
      return mainImagePath;
    }
    // backend serves: /images/xxx
    if (mainImagePath.startsWith("/")) {
      return `https://movie-backend-t7h7.onrender.com${mainImagePath}`;
    }
    // fallback (unlikely)
    return `https://movie-backend-t7h7.onrender.com/${mainImagePath}`;
  };

  // Initialize state / preview when dialog opens or movie changes
  useEffect(() => {
    setInputs({
      title: initialTitle,
      description: initialDescription,
      img: null,
    });
    setErrors({});
    setResult("");
    // set preview to backend image (if present)
    setPrevSrc(getImagePreviewUrlFromBackend(initialMainImage));
    // revoke any previous object URL stored
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, initialTitle, initialDescription, initialMainImage, isOpen]);

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  // Simple client-side validation that matches backend rules
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

    // revoke previous object URL if exists
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

    // basic guard: must have an id to update
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

      // if response has no JSON body, avoid crash
      let data = null;
      try {
        data = await response.json();
      } catch (err) {
        // ignore json parse errors (data stays null)
      }

      if (response.ok) {
        setResult("Movie updated successfully!");
        // return the updated movie to parent if available
        if (onUpdate) onUpdate(data || {});
        // close after a short delay so user sees success
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } else {
        // try to display useful server message
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
    <div id="edit-dialog" className="w3-modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="w3-modal-content">
        <div className="w3-container">
          <span id="dialog-close" className="w3-button w3-display-topright" onClick={onClose}>
            &times;
          </span>

          <h2>Edit Movie Post</h2>

          <form id="edit-property-form" onSubmit={onSubmit} encType="multipart/form-data">
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
