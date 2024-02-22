'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload();

  };

  return (
    <header className="header_section long_section px-0">
      <nav className="navbar navbar-expand-lg custom_nav-container ">
        <Link href="/" className="nav-link">
          
            <span>MyAlice</span>
          
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""> </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
            <ul className="navbar-nav  ">
              <li className="nav-item active">
                <Link href="/"className="nav-link">
                
                    Home <span className="sr-only">(current)</span>
                  
                </Link>
              </li>
            
              <li className="nav-item">
                <Link href="/contact" className="nav-link">
                  Lists
                </Link>
              </li>
            </ul>
          </div>
          <div className="quote_btn-container">
            {!isAuthenticated ? (
              <>
                <Link href="/login" >
               
                    <span>Login</span>
                    <i className="fa fa-user" aria-hidden="true" />
                 
                </Link>
                <Link href="/register">
                 
                    <span>Sign UP</span>
                  
                </Link>
              </>
            ) : (
              <button onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
