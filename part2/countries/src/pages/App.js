import React, { useState, useEffect } from 'react';
import InputText from '../components/InputText';
import Country from '../components/Country';
import CountryDetail from '../components/CountryDetail';
import axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountry, setFilteredCountry] = useState([]);
    const [showIndex, setShowIndex] = useState('');

    const filterData = ({ target: { value } }) => {
        setSearch(value);
        //filter data
        const newData = countries.filter(obj => {
            const pattern = new RegExp(value, 'i');
            return pattern.test(obj.name);
        });
        setFilteredCountry(newData);
    };

    const showResult = () => {
        let res;
        if(filteredCountry.length > 1) {
            res = filteredCountry.map(country => <Country key={country.alpha2Code} show={showIndex} text={country.name} typeButton="button" data={country} onShow={setShowIndex}/>);
        } else if(filteredCountry.length === 1) {
            res = <CountryDetail data={ filteredCountry[0] }/>;
        }
        return res;
    };

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then( ({ data }) => {
                setCountries( countries.concat(data) )
            });
    }, []);

    return (
        <div>
            <InputText label="find countries " inputVal={search} changeInputVal={filterData}/>
            { showResult() }
        </div>
    );
};

export default App;
