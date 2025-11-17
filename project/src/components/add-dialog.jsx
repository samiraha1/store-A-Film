import React, { useState, useRef, useEffect } from "react";
import "../css/AddDialog.css";

const VALIDATION_RULES = {
  title: {
    required: true,
    minLength: 3,        
    maxLength: 100,     
    pattern: null,      
  },
  description: {
    required: true,
    minLength: 1,     
    maxLength: 2000,   
    pattern: null,
  },
  image: {
    required: false,    
    maxSize: 5 * 1024 * 1024, 
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  },
};

const AddDialog = ({ isOpen, onClose, onSubmit, submitStatus = { type: null, message: "" }, isSubmitting = false }) => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef(null);

  const validateTitle = (title) => {
    const rules = VALIDATION_RULES.title;
    if (rules.required && !title.trim()) {
      return "Title is required";
    }
    if (title.trim().length < rules.minLength) {
      return `Title must be at least ${rules.minLength} characters`;
    }
    if (title.length > rules.maxLength) {
      return `Title must be no more than ${rules.maxLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(title)) {
      return "Title format is invalid";
    }
    return "";
  };

  const validateDescription = (description) => {
    const rules = VALIDATION_RULES.description;
    if (rules.required && !description.trim()) {
      return "Description is required";
    }
    if (description.trim().length < rules.minLength) {
      return `Description must be at least ${rules.minLength} characters`;
    }
    if (description.length > rules.maxLength) {
      return `Description must be no more than ${rules.maxLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(description)) {
      return "Description format is invalid";
    }
    return "";
  };

//   const validateImage = (file) => {
//     if (!file) return "";
//     const rules = VALIDATION_RULES.image;
    
//     if (!rules.allowedTypes.includes(file.type)) {
//       return `Image must be one of: ${rules.allowedTypes.map(t => t.split('/')[1]).join(', ')}`;
//     }
//     if (file.size > rules.maxSize) {
//       const maxSizeMB = Math.round(rules.maxSize / (1024 * 1024));
//       return `Image size must be less than ${maxSizeMB}MB`;
//     }
//     return "";
//   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (touched[name]) {
      const error = name === 'title' 
        ? validateTitle(value) 
        : validateDescription(value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = name === 'title' 
      ? validateTitle(value) 
      : validateDescription(value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     const error = validateImage(file);
    
//     if (error) {
//       setErrors((prev) => ({
//         ...prev,
//         image: error,
//       }));
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.image;
//       return newErrors;
//     });

//     setImageFile(file);
    
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    setTouched({ title: true, description: true });
    
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    // const imageError = validateImage(imageFile);
    
    if (titleError) newErrors.title = titleError;
    if (descriptionError) newErrors.description = descriptionError;
    // if (imageError) newErrors.image = imageError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setInputs({ title: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
    setTouched({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!isOpen && submitStatus.type === "success") {
      resetForm();
    }
  }, [isOpen, submitStatus.type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
    }

    if (onSubmit) {
      try {
        await onSubmit({
          ...inputs,
          imageFile: imageFile,
          imagePreview: imagePreview,
        });
      } catch (error) {
        console.error("Submission error:", error);
      }
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
                onBlur={handleBlur}
                className={errors.title ? "input-error" : ""}
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && touched.title && (
                <span id="title-error" className="error-message">
                  {errors.title}
                </span>
              )}
            </p>
            <p>
              <textarea
                id="description"
                name="description"
                placeholder="Post description"
                value={inputs.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className={errors.description ? "input-error" : ""}
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && touched.description && (
                <span id="description-error" className="error-message">
                  {errors.description}
                </span>
              )}
            </p>
            
            {/* <div className="image-upload-section">
              <label htmlFor="image-upload" className="file-upload-label">
                {imagePreview ? "Change Image" : "Upload Image (Optional)"}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="image-upload"
                name="image"
                accept={VALIDATION_RULES.image.allowedTypes.join(',')}
                onChange={handleImageChange}
                className="file-input"
                aria-invalid={errors.image ? "true" : "false"}
                aria-describedby={errors.image ? "image-error" : undefined}
              />
              {errors.image && (
                <span id="image-error" className="error-message">
                  {errors.image}
                </span>
              )}
              
              {imagePreview && (
                <div className="image-preview-container">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div> */}

            {submitStatus.type && (
              <div className={`submit-status submit-status-${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <button 
              type="submit" 
              className="w3-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDialog;