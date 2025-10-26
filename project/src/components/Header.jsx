import "./../css/Header.css";
import React from 'react';
import logo from '../images/storeafilm-part7.png';


export default function Header() {
    return (
        <header id="header">
            <div id="logo" class="top">
                <img src={logo} alt="logo" />
            </div>
            <div id="title" class="top" >
                <h1>Store-A-Film</h1>
                <input class="searchHome" type="text" placeholder="Search for a movie..." />
            </div>
            <nav id="nav" class="top">
                {/* <button id="menu-toggle" class="menu-btn" onclick="toggleMenu()">☰</button> */}

                {/* <ul id="menu">
                <li><a href="#">Login</a></li>
                <li><a href="#">Logout</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="addPlaylist.html">add Playlist</a></li>
                <li><a href="settings.html">Settings</a></li>

            </ul>  */}
            </nav>
        </header>
    );
}