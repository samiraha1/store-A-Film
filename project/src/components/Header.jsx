import "./../css/Header.css";
import React from 'react';


export default function Header() {
    return (
        <header className="site-header">
            <div className="logo">
                <img src="/images/storeafilm-part7.png" alt="logo" />
            </div>
            <h1 className="site-title">Store-A-Film</h1>
        </header>
    );
}