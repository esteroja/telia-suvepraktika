import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (

        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    Suvepraktika Proovitöö
                </a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <a href="https://github.com/esteroja/telia-suvepraktika" target="_blank">GitHubi repo</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;