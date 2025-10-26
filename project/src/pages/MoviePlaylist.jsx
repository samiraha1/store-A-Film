import "./../css/MoviePlaylist.css";
import silence from '../images/silence of the lambs.jpg';
import shining from '../images/theShining.jpg';
import dracula from '../images/dracula.jpg';
import insidious from '../images/insidious.png';

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
                    <div class="movie" id="movies">
                        <img src={silence} alt="silenceOfTheLambs"/>
                        <h4>The Silence of the Lambs</h4>
                    </div>
                    <div class="movie">
                        <img src={shining} alt="theShining"/>
                        <h4>The Shining</h4>
                    </div>
                    <div class="movie">
                        <img src={dracula} alt="Dracula" />
                        <h4>Dracula</h4>
                    </div>
                    <div class="movie">
                        <img src={insidious} alt="Insidious"/>
                        <h4>Insidious</h4>
                    </div>
                </div>
            </main>
        </>
    );
}