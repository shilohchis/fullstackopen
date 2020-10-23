import React, { useState, useEffect } from 'react';
import InputText from '../components/InputText';
import HeaderType from '../components/HeaderType';
import axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountry, setFilteredCountry] = useState([]);

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
        if(filteredCountry.length > 10) {
            res = <p>Too many matches, specify another filter</p>;
        } else if(filteredCountry.length <= 10 && filteredCountry.length > 1) {
            const lists = filteredCountry.map(country => <li key={ country.alpha3Code }>{ country.name }</li>);
            res = <ul>{lists}</ul>;
        } else if(filteredCountry.length == 1) {
            res = (
                <>
                    <HeaderType number={1} text={filteredCountry[0].name}/>
                    <p>capital { filteredCountry[0].capital }</p>
                    <p>population { filteredCountry[0].population }</p>
                    <HeaderType number={2} text="languages"/>
                    <ul>
                        {
                            filteredCountry[0].languages.map(item => <li key={ item.name }>{ item.name }</li>)
                        }
                    </ul>
                    <img src={ filteredCountry[0].flag } alt="flag" />
                </>
            );
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
            <InputText label="find countries" inputVal={search} changeInputVal={filterData}/>
            { showResult() }
        </div>
    );
};

export default App;
