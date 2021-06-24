import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    const onclick = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <header className="container-fluid d-flex position-absolute top-0 bg-primary border-bottom">
                <h2 className="me-md-auto mt-3 text-dark text-decoration-none">Welcome to Superheroes Searcher Page</h2>
                <div className=" container list-group list-group-horizontal d-flex" role="group" aria-label="Basic outlined example">
                    <Link className="list-group-item list-group-item-action d-flex text-center text-dark fs-4 align-items-center justify-content-center list-group-item-warning" to="/search">
                        Search 
                    </Link> 
                    <Link className="list-group-item list-group-item-action d-flex text-center text-dark fs-4 align-items-center justify-content-center list-group-item-warning" to="/team">
                         My Team 
                    </Link> 
                    {props.button.button === true && (
                        <Link className="list-group-item list-group-item-action d-flex text-center text-dark fs-4 align-items-center justify-content-center list-group-item-warning"
                         to="/"
                         onClick={onclick}
                        >Logout
                        </Link>
                    )}
            </div>
        </header>
    )
}

export default Header;
