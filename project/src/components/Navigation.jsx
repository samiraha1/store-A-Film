import "./../css/Navigation.css";
import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavBar() {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/discover">Discover</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    );
}