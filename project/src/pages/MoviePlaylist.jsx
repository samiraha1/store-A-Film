import "./../css/MoviePlaylist.css";
import Movies from "../components/Movies.jsx";
import silence from '../images/silence of the lambs.jpg';
import shining from '../images/theShining.jpg';
import parasite from '../images/parasite.jpg';
import insidious from '../images/insidious.png';
import orphan from '../images/orphan.jpg';


export default function MoviePLaylists() {
    return (
        <>
            <main id="all">
                <div class="create-header">
                    {/* <img src=""/> */}
                    <h1>Horror</h1>
                    <h5>Public Playlist</h5>
                    {/* <button id="movieBtn">Edit/Add</button>  */}

                </div>
                <div id="create">
                    <Movies
                        img={silence}
                        name="The Silence of The Lambs"
                        director="Jonathan Demme"
                        release="February 14, 1991"
                    />
                    <Movies
                        img={shining}
                        name="The Shining"
                        director="Stephen King"
                        release="May 23, 1980"
                    />
                    <Movies
                        img={orphan}
                        name="Orphan"
                        director="Jaume Collet-Serra"
                        release="July 24, 2009"
                    />
                    <Movies
                        img={insidious}
                        name="Insidious"
                        director="James Wan"
                        release="April 1, 2011"
                    />
                    <Movies
                        img={parasite}
                        name="Parasite"
                        director="Bong Joon Ho"
                        release="October 11, 2019"
                    />
                </div>
            </main>
        </>
    );
}
