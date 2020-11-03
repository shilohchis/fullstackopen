import React from 'react';
import '../index.css';

const FlashCard = ({ notification }) => {
    const { text, type } = notification;
    return (
        <div className={ !text ? 'hide' : `flash flash-${type}` }>
            <p>{text}</p>
        </div>
    );
};

export default FlashCard;
