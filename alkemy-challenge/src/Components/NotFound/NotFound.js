import React from 'react';
import { Link } from 'react-router-dom';
import '../Searcher/searcherStyles.scss';

function NotFound() {
    return (
        <div className="generalDiv">
            <div className="errorDiv">
                <h1 className="searchText">ERROR 404 : PAGE NOT FOUND</h1>
                <Link className="searchButtons" to="/"> Go back </Link>
            </div>
        </div>
    )
}

export default NotFound;
