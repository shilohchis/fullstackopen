import React from 'react';
import '../index.css';

const FlashCard = ({ text }) => {
    return (
        <div className={ text ? 'flash-success' : 'hide' }>
            <p>{text}</p>
        </div>
    );
};

export default FlashCard;
