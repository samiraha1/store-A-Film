import React, { useState } from "react";
import "../css/AddDialog.css";

const AddDialog = (props) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImageChange = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        "https://movie-backend-t7h7.onrender.com/api/movies/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok || response.status === 201) {
        const newMovie = await response.json();
        setResult("Post Successfully Added");
        event.target.reset(); 
        setInputs({}); 
        if (props.onSubmit) {
          props.onSubmit(newMovie); 
        }
        setTimeout(() => {
          if (props.onClose) {
            props.onClose();
          }
        }, 1500);
      } else {
        let errorMessage = `Error adding post (${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        setResult(errorMessage);
        console.error("Error adding post", response.status, errorMessage);
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!props.isOpen) {
    return null;
  }

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
          <h2>Add New Blog Post</h2>
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
            </p>

            <section className="image-upload-section">
              <p id="img-prev-section">
                {inputs.img && (
                  <img
                    id="img-prev"
                    src={URL.createObjectURL(inputs.img)}
                    alt="Preview"
                    className="image-preview"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                )}
              </p>
              <p id="img-upload">
                <label htmlFor="img">Upload Image (Optional):</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                />
              </p>
            </section>

            <p>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </p>
            <p style={{ 
              color: result.includes("Successfully") ? 'green' : result.includes("Error") || result.includes("error") ? 'red' : 'black' 
            }}>
              {result}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDialog;
