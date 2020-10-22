import React from 'react';

const HeaderType = ({ number, text }) => {
    switch (number) {
        case 6:
            return <h6>{ text }</h6>
        case 5:
            return <h5>{ text }</h5>
        case 4:
            return <h4>{ text }</h4>
        case 3:
            return <h3>{ text }</h3>
        case 2:
            return <h2>{ text }</h2>
        default:
            return <h1>{ text }</h1>
    }
};

export default HeaderType;
