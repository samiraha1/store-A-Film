import "./../css/Movies.css";
import "./../css/MoviePlaylist.css";

import silence from '../images/silence of the lambs.jpg';
import shining from '../images/theShining.jpg';
import dracula from '../images/dracula.jpg';
import insidious from '../images/insidious.png';


function Movies(movie) {
    return (
        <section className="movie">
            <div class="movie" id="movies">
                <h3>{movie.name}</h3>
                <p>Director: {movie.director}</p>
                <p>Release Date: {movie.release}</p>
                <img src={movie.img} alt={movie.name}/>
            </div>
        </section>
    );
}

export default Movies;