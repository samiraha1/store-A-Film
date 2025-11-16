import "../css/Blog.css"
function BlogPost({ movie, onClick }) {
    // Structure matches the original: img first, then h2, then p.post
    // This matches the CSS expectations (.popular img, .popular h2, .popular .post)
    return (
        <div onClick={() => onClick(movie)} className="api" style={{ cursor: 'pointer', width: '100%',  }}>
            {movie.img && (
                <img 
                    src={`https://movie-backend-t7h7.onrender.com${movie.img}`} 
                    alt={ movie.title || "Movie poster"} 
                />
            )}
            <h2>{movie.title || movie.title}</h2>
            <p className="post">
                {movie.description && <>{movie.description}</>}
            </p>
        </div>
    );
}

export default BlogPost;