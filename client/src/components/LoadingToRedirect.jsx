import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


const LoadingToRedirect = ({ path }) => {

    const [count, setCount] = useState(3);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(curretnCount => --curretnCount);
        }, 1000);
        count === 0 && navigate(path);
        return () => clearInterval(interval);
    }, [count, navigate, path]);

    return (
        <div style={{ marginTop: '150px' }}>
            <Spinner />
            <div style={{ height: '50px' }}></div>
            <h5>Redirecting you in {count} seconds</h5>
        </div>
    );
};


export default LoadingToRedirect;