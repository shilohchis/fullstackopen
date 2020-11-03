import React, { useState, useEffect } from 'react';
import FormBasic from '../sections/FormBasic';
import Search from '../sections/Search';
import FlatList from '../components/FlatList';
import HeaderType from '../components/HeaderType';
import _ from 'lodash';
import phonebook from '../services/phonebook';

const App = () => {
    const [ showAll, setShowAll ] = useState(true);
    const [ search, setSearch ] = useState('');
    const [ newName, setNewName ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ persons, setPersons ] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);

    const changeInputVal = ({ target: { value } }, type = null) => {
        switch (type) {
            case 'name':
                setNewName(value);
                break;
            default:
                setNewPhone(value);
        }
    };

    const resetInput = () => {
        setNewName('');
        setNewPhone('');
    };

    const addNewData = e => {
        e.preventDefault();
        const find = persons.find( obj => obj.name.toLowerCase() === newName.toLowerCase() || obj.phone === newPhone );
        if(!find) {
            phonebook.add({ name: newName, number: newPhone })
                .then(resp => phonebook.list())
                .then(list => {
                    setPersons(list);
                });
            resetInput();
        } else {
            alert(`${newName.toLowerCase() === find.name.toLowerCase() ? newName : newPhone} is already added to phonebook`);
        }
    };

    const dataForm = {
        button: { type: "submit", label: "add", submitHandler: addNewData },
        inputs: [
            { label: 'name', value: newName, valueHandler: changeInputVal },
            { label: 'phone', value: newPhone, valueHandler: changeInputVal },
        ]
    };

    const filterData = newSearch => {
        setSearch(newSearch);
        if(newSearch.length > 0) {
            let filteredData = _.filter(persons, (val, idx) => {
                let keysObj = Object.keys(val), passedCount = 0;
                for (let k of keysObj) {
                    let regPattern = new RegExp(newSearch, "i");
                    if(regPattern.test(val[k])) ++passedCount;
                }
                if(passedCount > 0) {
                    return val;
                }
            });
            setFilteredPersons(filteredData);
            setShowAll(false);
        } else {
            setShowAll(true);
        }
    };

    const delRow = id => {
        phonebook.del(id)
            .then(resp => {
                setPersons( persons.filter(obj => obj.id != id) );
            });
    };

    useEffect(() => {
        phonebook.list()
            .then(resp => setPersons(persons.concat( resp )));
    }, []);

    return (
        <div>
            <HeaderType number={2} text="Phonebook"/>
            <Search value={search} changeValue={filterData}/>
            <HeaderType number={2} text="add a new"/>
            <FormBasic data={dataForm}/>
            <HeaderType number={2} text="Numbers"/>
            <FlatList datas={ showAll ? persons : filteredPersons } showKeys={['name', 'number']} onDelete={delRow}/>
        </div>
    );
};

export default App;
