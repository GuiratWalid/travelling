import React from 'react';


const NotFound = () => {
    return (
        <div style={{ marginTop: '150px' }}>
            <img
                src='/images/404.jpg'
                alt='Not Found'
                style={{
                    height: '350px',
                    width: '350px'
                }}
            />
            <h2>Oops ! Page Not Found !</h2>
        </div>
    );
};


export default NotFound;