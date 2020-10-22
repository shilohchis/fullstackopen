import React from 'react';

const Button = ({ type, label }) => {
    return (
        <div>
            <button type={type}>{label}</button>
        </div>
    );
};

export default Button;
