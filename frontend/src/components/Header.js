import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                {token ? (
                    <>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <button onClick={handleLogout} className="nav-link">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/" className="nav-link"></Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
