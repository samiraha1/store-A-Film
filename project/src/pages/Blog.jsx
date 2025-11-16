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

  const handleAddPost = (values) => {
    const newPost = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      img: "", 
    };
    setMoviePosts((prev) => [newPost, ...prev]);
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
        onClose={handleCloseDialog}
        onSubmit={handleAddPost}
      />
    </main>
  );
}