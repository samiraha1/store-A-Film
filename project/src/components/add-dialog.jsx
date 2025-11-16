import React, { useState } from "react";
import "../css/AddDialog.css";


const AddDialog = ({ isOpen, onClose, onSubmit }) => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(inputs);
    }
    setInputs({ title: "", description: "" });
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="add-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={onClose}
          >
            &times;
          </span>
          <form id="add-property-form" onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Post title"
                value={inputs.title}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Post description"
                value={inputs.description}
                onChange={handleChange}
                required
              />
            </p>
            <button type="submit" className="w3-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDialog;