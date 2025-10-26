import "./../css/Home.css";
import horror from '../images/silhouette-3777403_640.jpg';
import romance from '../images/valentines-day-background-3060241_640.jpg';
import { NavLink } from 'react-router-dom';



export default function Home() {
    return (
        <main id="home">
            <div id="friends" class="extra">
                <h3>Friends</h3>
            </div>
            <div id="main-playlist" class="extra">
                <h3>Playlist</h3>
                <a class="add" href="addPlaylist.html">Add Playlist</a>
                <div id="sec-playlists2">
                    <div class="profile-playlist">
                        <NavLink to="/MoviePlaylist" class="profile-playlist"><img src={horror} alt="horrorImg" />
                            <h1>Horror</h1>
                            <p>Some horrors I've watched</p></NavLink>
                        {/* <img src={horror} alt="horrorImg" />
                        <h1>Horror</h1>
                        <p>Some horrors I've watched</p> */}
                    </div>
                    <div class="profile-playlist" >
                        <NavLink to="/Romance" class="profile-playlist">
                            <img src={romance} alt="romanceImg" />
                            <h1>Romance</h1>
                            <p>Movies I've watched and want to watch</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </main>

    );
}