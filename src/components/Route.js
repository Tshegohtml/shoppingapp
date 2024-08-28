import React from 'react';
import { Navigate } from 'react-router';


const Route = ({ element}) => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    return isLoggedIn ? element : <Navigate to="/" />;

};

export default Route;