import {useState} from "react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./../css/Navigation.css";
import Header from "./components/Header.jsx";
import Nav from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className="app-root">
            <header>
                <div id="menu-toggle" class="menu-btn" onClick={toggleMenu}>☰</div>
                <Header />
            </header>
            <Nav />
            <main className="app-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;