import {useState} from "react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Nav from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import csceImage from "./images/csce.jpg";

const Layout = () => {
    
    return (
        <div className="app-root" style={{backgroundImage:`url(${csceImage})`}}>
            <header>
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