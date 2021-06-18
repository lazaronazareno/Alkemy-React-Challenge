import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="container-fluid bg-primary position-absolute top-0 border-bottom">
            <div className="d-flex">
                <h2 className="me-md-auto text-dark text-decoration-none">Welcome to Superheroes Searcher Page</h2>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                  <button type="button" class="btn-sm btn-outline-danger">
                      <Link className="nav-link text-dark" aria-current="page" to="/search">Search</Link> 
                  </button>
                  <button type="button" class="btn-sm btn-outline-danger">
                      <Link className="nav-link text-dark" to="/team">My Team</Link> 
                  </button>
                </div>
            </div>
        </header>
    )
}

export default Header;
