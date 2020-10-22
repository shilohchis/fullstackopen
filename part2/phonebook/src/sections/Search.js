import React from 'react';
import InputText from '../components/InputText';

const Search = ({ value, changeValue }) => {
    return (
        <>
            <InputText label="filter shown with" inputVal={value} changeInputVal={e => changeValue(e.target.value)}/>
        </>
    );
};

export default Search;
