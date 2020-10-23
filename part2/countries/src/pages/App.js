import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then( ({ data }) => {
                setCountries(countries.concat(data))
            });
    }, []);

    return (
        <div>

        </div>
    );
};

export default App;
