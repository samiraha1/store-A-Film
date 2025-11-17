import "./../css/Blog.css";
import "./../css/Slideshow.css";
import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost";
import BlogModal from "../components/BlogModal";
import AddDialog from "../components/add-dialog.jsx";

export default function Blog() {
  function importAll(r) {
    return r.keys().map((key) => {
      const mod = r(key);
      return mod.default || mod;
    });
  }

  const images = importAll(
    require.context("./../images/slideshow", false, /\.(png|jpe?g|svg)$/i)
  );

  const bios = [
    "The Mitchells Vs The Machines 2 In The Works From Sony Pictures Animation — Netflix To Release",
    "Scream 7’ Trailer: Neve Campbell Returns to Face Ghostface in the Franchise’s Next Chapter",
    "Wake Up Dead Man Was ‘The Hardest Script I’ve Ever Written’, Says Rian Johnson",
  ];

  const slides = images.map((src, i) => ({ src, bio: bios[i] || "" }));

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setSlideIndex(0);
      return;
    }
    if (slideIndex >= images.length) {
      setSlideIndex(images.length - 1);
    }
  }, [images.length, slideIndex]);

  const slideForward = () => {
    if (images.length === 0) return;
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slideBackward = () => {
    if (images.length === 0) return;
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const [moviePosts, setMoviePosts] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [movieError, setMovieError] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, 
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetch(
          "https://movie-backend-t7h7.onrender.com/api/movies/"
        );

        if (!response.ok) {
          throw new Error(`Error fetching movies: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setMoviePosts(data || []);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (isMounted) {
          setMovieError("There was a problem loading movie posts.");
        }
      } finally {
        if (isMounted) {
          setLoadingMovies(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePostClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddPost = async (values) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      let requestBody;
      let headers = {};

      if (values.imageFile) {
        const formData = new FormData();
        formData.append("name", values.title);
        formData.append("description", values.description);
        // formData.append("img", values.imageFile);
        
        requestBody = formData;
      } else {
        requestBody = JSON.stringify({
          name: values.title,
          description: values.description,
        });
        headers["Content-Type"] = "application/json";
      }

      const apiUrl = "https://movie-backend-t7h7.onrender.com/api/movies";
      let response;
      try {
        response = await fetch(`${apiUrl}/`, {
          method: "POST",
          headers: headers,
          body: requestBody,
        });
      } catch (networkError) {
        throw new Error(`Network error: ${networkError.message}. Please check if the backend server is accessible.`);
      }

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (parseError) {
          if (response.status === 404) {
            errorMessage = "POST endpoint not found (404). Please check if your backend has implemented the POST route at /api/movies/";
          } else if (response.status === 400) {
            errorMessage = "Invalid data (400). Please check your form inputs match the backend requirements.";
          } else if (response.status === 500) {
            errorMessage = "Server error (500). Please try again later.";
          }
        }
        
        throw new Error(errorMessage);
      }

      let newPost;
      
      try {
        const responseText = await response.text();
        if (responseText) {
          newPost = JSON.parse(responseText);
        } else {
          throw new Error("Server returned empty response");
        }
      } catch (parseError) {
        throw new Error("Server returned invalid response format. Expected JSON.");
      }

      setMoviePosts((prev) => [newPost, ...prev]);

      setSubmitStatus({
        type: "success",
        message: "Post added successfully!",
      });

      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitStatus({ type: null, message: "" });
      }, 2000);
    } catch (error) {
      console.error("Error adding post:", error);
      
      let errorMessage = "Failed to add post. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your internet connection and ensure the backend server is running.";
      }
      
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-blog">
      <h2 className="blog-title">What's going on?</h2>
      <button className="addBlog" type="button" onClick={handleOpenDialog}>
        Add Blog Post
      </button>

      <div id="slideshow">
        {slides.length > 0 ? (
          <>
            <img
              src={images[slideIndex]}
              alt={`Slide ${slideIndex + 1}`}
            />
            <p id="slide-bio">{slides[slideIndex].bio}</p>
          </>
        ) : (
          <div className="no-slides">No slideshow images found</div>
        )}

        <p id="forward-arrow" onClick={slideForward}>
          &gt;
        </p>
        <p id="backward-arrow" onClick={slideBackward}>
          &lt;
        </p>
      </div>

      <div id="blog">
        {loadingMovies && (
          <p className="post loading">Loading movie posts...</p>
        )}

        {movieError && !loadingMovies && (
          <p className="post error">{movieError}</p>
        )}

        {!loadingMovies && !movieError && moviePosts.length === 0 && (
          <p className="post">No movie posts available right now.</p>
        )}

        {!loadingMovies &&
          !movieError &&
          moviePosts.map((movie) => (
            <div className="popular" key={movie.id}>
              <BlogPost movie={movie} onClick={handlePostClick} />
            </div>
          ))}
      </div>

      <BlogModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <AddDialog
        isOpen={isDialogOpen}
        onClose={() => {
          handleCloseDialog();
          setSubmitStatus({ type: null, message: "" });
        }}
        onSubmit={handleAddPost}
        submitStatus={submitStatus}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const Joi = require("joi");
// const multer = require("multer");
// const fs = require("fs");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, "public", "images");
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     },
//     fileFilter: (req, file, cb) => {
//         if (!file) {
//             return cb(null, true);
//         }
        
//         const allowedTypes = /jpeg|jpg|png|gif|webp/;
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedTypes.test(file.mimetype);
        
//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
//         }
//     }
// });

// let movies = [
//     {
//         id: 1,
//         title: "New Demon Slayer Movie",
//         description: "This movie was so good. I definitely recommend...",
//         img: "/images/demon-slayer.png"
//     },
//     {
//         id: 2,
//         title: "Negative Reviews on the movie 'Him'",
//         description: "There have been lots of opinions on the new Him movie...",
//         img: "/images/him.jpg"
//     },
// ];

// const movieSchema = Joi.object({
//     name: Joi.string()
//         .min(1)
//         .max(200)
//         .required()
//         .messages({
//             "string.empty": "Title is required",
//             "string.min": "Title must be at least 1 character",
//             "string.max": "Title must be no more than 200 characters",
//             "any.required": "Title is required"
//         }),
//     description: Joi.string()
//         .min(1)
//         .max(2000)
//         .required()
//         .messages({
//             "string.empty": "Description is required",
//             "string.min": "Description must be at least 1 character",
//             "string.max": "Description must be no more than 2000 characters",
//             "any.required": "Description is required"
//         }),
//     img: Joi.string()
//         .optional()
//         .allow("") 
//         .messages({
//             "string.base": "Image path must be a string"
//         })
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
//     console.log(__dirname);
// });

// app.get("/api/movies", (req, res) => {
//     console.log("GET /api/movies called");
//     res.json(movies);
// });

// app.get("/api/test", (req, res) => {
//     res.json({ message: "Backend is running!", timestamp: new Date().toISOString() });
// });

// const handlePostMovie = (req, res) => {
//     console.log("POST /api/movies called");
    
//     try {
//         let movieData;
        
//         if (req.file) {
//             movieData = {
//                 name: req.body.name || req.body.title, 
//                 description: req.body.description,
//                 img: `/images/${req.file.filename}`
//             };
//         } else {
//             movieData = req.body;
//         }
        
//         const { error, value } = movieSchema.validate(movieData, { abortEarly: false });
        
//         if (error) {
//             const errorMessages = error.details.map(detail => detail.message).join(", ");
//             return res.status(400).json({
//                 error: "Validation error",
//                 message: errorMessages,
//                 details: error.details
//             });
//         }
        
//         const newMovie = {
//             id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
//             title: value.name, 
//             description: value.description,
//             img: movieData.img || "" 
//         };
        
//         movies.push(newMovie);
        
//         console.log("New movie added:", newMovie);
        
//         res.status(201).json(newMovie);
        
//     } catch (err) {
//         console.error("Error in POST /api/movies:", err);
//         res.status(500).json({
//             error: "Internal server error",
//             message: err.message
//         });
//     }
// };

// app.post("/api/movies/", upload.single("img"), handlePostMovie);
// app.post("/api/movies", upload.single("img"), handlePostMovie);

// app.use((err, req, res, next) => {
//     console.error("Error middleware caught:", err.message);
    
//     if (err instanceof multer.MulterError) {
//         if (err.code === "LIMIT_FILE_SIZE") {
//             return res.status(400).json({
//                 error: "File too large",
//                 message: "Image size must be less than 5MB"
//             });
//         }
//         return res.status(400).json({
//             error: "File upload error",
//             message: err.message
//         });
//     }
    
//     if (err) {
//         return res.status(400).json({
//             error: "Validation error",
//             message: err.message
//         });
//     }
    
//     next();
// });

// app.use((req, res) => {
//     res.status(404).json({
//         error: "Route not found",
//         message: `${req.method} ${req.path} is not defined`
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on http://localhost:${PORT}`);
//     console.log(`GET endpoint: http://localhost:${PORT}/api/movies`);
//     console.log(`POST endpoint: http://localhost:${PORT}/api/movies/`);
// });
