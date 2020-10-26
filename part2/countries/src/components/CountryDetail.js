import React from 'react';
import HeaderType from './HeaderType';

const CountryDetail = ({ data }) => {
    return (
        <div>
            <HeaderType number={1} text={ data.name }/>
            <p>capital { data.capital }</p>
            <p>population { data.population }</p>
            <HeaderType number={2} text="languages"/>
            <ul>
                {
                    data.languages.map(item => <li key={ item.name }>{ item.name }</li>)
                }
            </ul>
            <img src={ data.flag } alt="flag" />
        </div>
    );
};

export default CountryDetail;
