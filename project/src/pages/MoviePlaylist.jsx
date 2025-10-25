import "./../css/MoviePlaylist.css";
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
                    <div id="movie"></div>
                    <div class="movie" id="movies">
                        <img src="../images/silence of the lambs.jpg" alt="silenceOfTheLambs"/>
                        <h4>The Silence of the Lambs</h4>
                    </div>
                    <div class="movie">
                        <img src="../images/the shining.jpg" alt="theShining"/>
                        <h4>The Shining</h4>
                    </div>
                    <div class="movie">
                        <img src="../images/dracula.jpg" alt="Dracula" />
                        <h4>Dracula</h4>
                    </div>
                    <div class="movie">
                        <img src="../images/256px-Insidious_Movie_Logo.png" alt="Insidious"/>
                        <h4>Insidious</h4>
                    </div>
                </div>
            </main>
        </>
    );
}