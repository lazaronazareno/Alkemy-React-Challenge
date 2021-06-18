import React from 'react';
import { Link } from 'react-router-dom';
import '../Searcher/searcherStyles.scss';

function NotFound() {
    return (
        <div className="card mb-3 text-dark bg-warning p-4">
                <h1>ERROR 404 : PAGE NOT FOUND</h1>
                <Link className="btn btn-primary btn-lg" to="/"> Go back </Link>
        </div>
    )
}

export default NotFound;
