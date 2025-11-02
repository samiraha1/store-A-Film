import "./../css/Navigation.css";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from "react";


export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };

    return (

        <nav id="mainSec-nav">

            <div id="sec-nav">
                <div id="menu-toggle" onClick={toggleMenu}>☰</div>

                <ul id="new-menu" className={menuOpen ? "" : "hide-small"}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/discover">Discover</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}