import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Nav from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
    return (
        <>
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;