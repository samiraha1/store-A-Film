import "../css/AddDialog.css";
import React, { useState } from "react";

const AddDialog = (props) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState("");

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

      if (response.status === 200) {
        const newMovie = await response.json();
        setResult("Post Successfully Added");
        event.target.reset(); // Reset form fields
        setInputs({}); // Clear inputs state
        if (props.onSubmit) {
          props.onSubmit(newMovie); // Call parent's onSubmit if provided
        }
        // Close dialog after short delay to show success message
        setTimeout(() => {
          if (props.onClose) {
            props.onClose();
          }
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        setResult(errorData.message || "Error adding post");
        console.log("Error adding post", response);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Network error. Please try again.");
    }
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div id="add-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.onClose}
          >
            &times;
          </span>
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
                  accept="image/*"
                />
              </p>
            </section>

            <p>
              <button type="submit">Submit</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDialog;
