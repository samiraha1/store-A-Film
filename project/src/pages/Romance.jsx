import "./../css/MoviePlaylist.css";
import Movies from "../components/Movies.jsx";
import silence from '../images/10_things_i_hate_about_you_poster.jpeg';
import shining from '../images/lalaland (2).jpg';
import orphan from '../images/the fault in our stars.jpg';
import insidious from '../images/theNotebook.jpg';

export default function MoviePLaylists() {
    return (
        <>
            <main id="all">
                <div class="create-header">
                    {/* <img src=""/> */}
                    <h1>Romance</h1>
                    <h5>Public Playlist</h5>
                    {/* <button id="movieBtn">Edit/Add</button>  */}

                </div>
                <div id="create">
                    <Movies
                        img={silence}
                        name="10 Things I Hate About You"
                        director="Gil Junger"
                        release="March 31, 1999"
                    />
                    <Movies
                        img={shining}
                        name="La La Land"
                        director="Damien Chazelle"
                        release="December 9, 2016"
                    />
                    <Movies
                        img={orphan}
                        name="The Fault in Our Stars"
                        director="Josh Boone"
                        release="June 6, 2014"
                    />
                    <Movies
                        img={insidious}
                        name="The Notebook"
                        director="Nick Cassavetes"
                        release="June 25, 2004"
                    />
                </div>
            </main>
        </>
    );
}