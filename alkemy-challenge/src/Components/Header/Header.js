import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="container-fluid d-flex position-absolute top-0 bg-primary border-bottom">
                <h2 className="me-md-auto mt-3 text-dark text-decoration-none">Welcome to Superheroes Searcher Page</h2>
                <div className="list-group list-group-horizontal d-flex" role="group" aria-label="Basic outlined example">
                    <Link className="list-group-item list-group-item-action d-flex text-center align-items-center list-group-item-danger" to="/search">
                        Search 
                    </Link> 
                    <Link className="list-group-item list-group-item-action text-center align-items-center list-group-item-danger" to="/team">
                         My Team 
                    </Link> 
            </div>
        </header>
    )
}

export default Header;
