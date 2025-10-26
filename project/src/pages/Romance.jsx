import "./../css/MoviePlaylist.css";
import silence from '../images/10_things_i_hate_about_you_poster.jpeg';
import shining from '../images/lalaland (2).jpg';
import dracula from '../images/the fault in our stars.jpg';
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
                    <div class="movie" id="movies">
                        <img src={silence} alt="10ThingsIHateAboutYou"/>
                        <h4>10 Things I Hate About You</h4>
                    </div>
                    <div class="movie">
                        <img src={shining} alt="LaLaLand"/>
                        <h4>La La Land</h4>
                    </div>
                    <div class="movie">
                        <img src={dracula} alt="TheFaultInOurStars" />
                        <h4>The Fault In Our Stars</h4>
                    </div>
                    <div class="movie">
                        <img src={insidious} alt="theNotebook"/>
                        <h4>The Notebook</h4>
                    </div>
                </div>
            </main>
        </>
    );
}