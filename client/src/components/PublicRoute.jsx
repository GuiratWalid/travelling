import React from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';


const PublicRoute = ({ children }) => {

    const { user } = useSelector(state => ({ ...state.auth }));

    return user ? <LoadingToRedirect path='/' /> : children;
};


export default PublicRoute;