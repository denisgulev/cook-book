import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({location}) => (
    <div>
        404! No match for {location.pathname}, <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;