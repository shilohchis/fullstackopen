import React from 'react';
import CountryDetail from './CountryDetail';

const Country = ({ text, typeButton, show, data, onShow }) => {
    const triggerClickShow = () => {
        onShow(data.alpha2Code);
    };

    return (
        <div>
            <label>{ text }  </label>
            <button type={typeButton} onClick={triggerClickShow}>
                { data.alpha2Code === show ? 'hide' : 'show' }
            </button>
            { data.alpha2Code === show
                ? <CountryDetail data={data}/>
                : null
            }
        </div>
    );
};

export default Country;
